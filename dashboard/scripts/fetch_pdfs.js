const fs = require('fs');
const path = require('path');
const https = require('https');

const papersPath = path.join(__dirname, '../public/data/papers.json');
let papers = JSON.parse(fs.readFileSync(papersPath, 'utf-8'));

function getUnpaywallPdf(doi) {
  return new Promise((resolve) => {
    // Unpaywall requiere un email real-ish
    const email = "researcher@sirca-rag.edu";
    const url = `https://api.unpaywall.org/v2/${doi}?email=${email}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.is_oa && parsed.best_oa_location && parsed.best_oa_location.url_for_pdf) {
            resolve(parsed.best_oa_location.url_for_pdf);
          } else {
            // A veces no hay PDF directo pero sí una URL para la página OA
            if (parsed.is_oa && parsed.best_oa_location && parsed.best_oa_location.url) {
               // Preferimos mantener N/A si no es explícitamente un PDF, pero si el usuario quiere acceso, 
               // la URL principal ya lleva ahí. Queremos url_for_pdf específicamente.
               resolve(null);
            } else {
               resolve(null);
            }
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function getSemanticScholarPdf(title) {
    return new Promise((resolve) => {
        const query = encodeURIComponent(title);
        const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${query}&limit=1&fields=openAccessPdf`;
        
        const options = {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        };
        
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.data && parsed.data.length > 0 && parsed.data[0].openAccessPdf && parsed.data[0].openAccessPdf.url) {
                        resolve(parsed.data[0].openAccessPdf.url);
                    } else {
                        resolve(null);
                    }
                } catch(e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

// Función auxiliar para esperar
const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchPdfs() {
  console.log(`Buscando PDFs Open Access para ${papers.length} papers...`);
  let pdfCount = 0;

  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    
    // Si ya tiene un PDF que parece válido, lo conservamos (ej. arxiv directos)
    if (paper.pdfUrl && paper.pdfUrl !== "N/A" && paper.pdfUrl.endsWith('.pdf')) {
      pdfCount++;
      continue;
    }
    
    let foundPdf = null;
    
    // Si es arxiv puro en la URL
    if (paper.url && paper.url.includes("arxiv.org/abs/")) {
        foundPdf = paper.url.replace("abs", "pdf") + ".pdf";
    }

    // Estrategia 1: Unpaywall vía DOI
    if (!foundPdf && paper.doi && paper.doi.startsWith("10.")) {
      console.log(`[${i+1}/${papers.length}] Consultando Unpaywall para DOI: ${paper.doi}`);
      foundPdf = await getUnpaywallPdf(paper.doi);
      await delay(100); // Respetar rate limits
    }
    
    // Estrategia 2: Semantic Scholar vía Título
    if (!foundPdf) {
      console.log(`[${i+1}/${papers.length}] Consultando Semantic Scholar para PDF...`);
      foundPdf = await getSemanticScholarPdf(paper.title);
      await delay(200); // Respetar rate limits
    }
    
    if (foundPdf) {
      paper.pdfUrl = foundPdf;
      pdfCount++;
      console.log(`  -> PDF Encontrado: ${foundPdf}`);
    } else {
      paper.pdfUrl = "N/A"; // No Open Access o no encontrado
    }
  }
  
  fs.writeFileSync(papersPath, JSON.stringify(papers, null, 2));
  console.log(`\n¡Búsqueda de PDFs completada!`);
  console.log(`Se encontraron PDFs directos y legales para ${pdfCount} de los ${papers.length} papers.`);
}

fetchPdfs();
