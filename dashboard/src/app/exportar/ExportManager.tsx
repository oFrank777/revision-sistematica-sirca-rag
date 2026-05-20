"use client";

import { useState } from "react";
import { Paper } from "@/types";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Check, Download, FileSpreadsheet, FileJson, Code, Database, RefreshCw } from "lucide-react";

export default function ExportManager({ papers }: { papers: Paper[] }) {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExport = async (format: 'xlsx' | 'json' | 'bibtex' | 'ris') => {
    setIsExporting(format);
    
    // Simular un pequeño delay para feedback visual (UX)
    await new Promise(r => setTimeout(r, 800));

    try {
      const dateStr = new Date().toISOString().split('T')[0];
      const filename = `SIRCA_RAG_Dataset_${dateStr}`;

      switch (format) {
        case 'json':
          const jsonBlob = new Blob([JSON.stringify(papers, null, 2)], { type: "application/json" });
          saveAs(jsonBlob, `${filename}.json`);
          break;
          
        case 'xlsx':
          const worksheet = XLSX.utils.json_to_sheet(papers);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Papers");
          const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
          const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          saveAs(excelBlob, `${filename}.xlsx`);
          break;

        case 'bibtex':
          const bibtexContent = papers.map(p => p.bibtex).join("\n\n");
          const bibtexBlob = new Blob([bibtexContent], { type: "text/plain;charset=utf-8" });
          saveAs(bibtexBlob, `${filename}.bib`);
          break;

        case 'ris':
          const risContent = papers.map(p => p.risCitation).join("\n\n");
          const risBlob = new Blob([risContent], { type: "application/x-research-info-systems" });
          saveAs(risBlob, `${filename}.ris`);
          break;
      }
      
      setSuccess(format);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Export failed", error);
      alert("Hubo un error al exportar los datos.");
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">Seleccione el formato de descarga</h3>
        <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted">
          El corpus actual contiene {papers.length} artículos académicos categorizados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExportButton 
          format="xlsx" 
          title="Dataset Completo (Excel)" 
          desc="Todas las columnas, metadatos y scores"
          icon={<FileSpreadsheet size={24} />}
          isLoading={isExporting === 'xlsx'}
          isSuccess={success === 'xlsx'}
          onClick={() => handleExport('xlsx')}
          colorClass="hover:border-green-500 hover:shadow-green-500/20"
        />
        
        <ExportButton 
          format="json" 
          title="Raw Data (JSON)" 
          desc="Estructura JSON nativa para desarrollo"
          icon={<FileJson size={24} />}
          isLoading={isExporting === 'json'}
          isSuccess={success === 'json'}
          onClick={() => handleExport('json')}
          colorClass="hover:border-yellow-500 hover:shadow-yellow-500/20"
        />

        <ExportButton 
          format="bibtex" 
          title="Citas BibTeX" 
          desc="Archivo .bib listo para LaTeX"
          icon={<Code size={24} />}
          isLoading={isExporting === 'bibtex'}
          isSuccess={success === 'bibtex'}
          onClick={() => handleExport('bibtex')}
          colorClass="hover:border-blue-500 hover:shadow-blue-500/20"
        />

        <ExportButton 
          format="ris" 
          title="Formato RIS" 
          desc="Para Zotero, Mendeley o EndNote"
          icon={<Database size={24} />}
          isLoading={isExporting === 'ris'}
          isSuccess={success === 'ris'}
          onClick={() => handleExport('ris')}
          colorClass="hover:border-purple-500 hover:shadow-purple-500/20"
        />
      </div>

      <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/10 border border-primary-200 dark:border-primary-800/50 rounded-xl text-sm">
        <h4 className="font-bold text-primary-800 dark:text-primary-300 mb-2">Uso de los datos</h4>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mb-4">
          Los datos exportados forman parte del marco de evaluación DSR del proyecto SIRCA-RAG. 
          Contienen metadatos procesados, resúmenes sintetizados y puntuaciones calculadas según 5 dimensiones técnicas.
        </p>
        <p className="text-xs text-academic-light-muted dark:text-academic-dark-muted">
          Licencia recomendada para publicación: CC BY 4.0
        </p>
      </div>
    </div>
  );
}

function ExportButton({ format, title, desc, icon, isLoading, isSuccess, onClick, colorClass }: any) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || isSuccess}
      className={`relative flex flex-col items-center text-center p-6 bg-white dark:bg-academic-dark-bg border-2 border-academic-light-border dark:border-academic-dark-border rounded-xl transition-all duration-300 ${colorClass} group ${isSuccess ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : ''}`}
    >
      <div className={`mb-4 p-4 rounded-full ${isSuccess ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'bg-academic-light-surface dark:bg-academic-dark-surface text-academic-light-muted dark:text-academic-dark-muted group-hover:text-primary-500 transition-colors'}`}>
        {isLoading ? <RefreshCw className="animate-spin" size={24} /> : 
         isSuccess ? <Check size={24} /> : icon}
      </div>
      <h4 className="font-bold text-academic-light-text dark:text-academic-dark-text mb-1">{title}</h4>
      <p className="text-xs text-academic-light-muted dark:text-academic-dark-muted">{desc}</p>
      
      {!isLoading && !isSuccess && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary-500">
          <Download size={18} />
        </div>
      )}
    </button>
  );
}
