import { Paper, ResearchGap, TaxonomyCategory, PRISMAData } from "@/types";

// En Next.js App Router, podemos cargar JSON estáticos directamente
import papersData from "../../public/data/papers.json";
import gapsData from "../../public/data/gaps.json";
import taxonomyData from "../../public/data/taxonomy.json";
import prismaData from "../../public/data/prisma.json";

export async function getPapers(): Promise<Paper[]> {
  return papersData as Paper[];
}

export async function getGaps(): Promise<ResearchGap[]> {
  return gapsData as unknown as ResearchGap[];
}

export async function getTaxonomy(): Promise<TaxonomyCategory[]> {
  return taxonomyData as TaxonomyCategory[];
}

export async function getPRISMA(): Promise<PRISMAData> {
  return prismaData as PRISMAData;
}

export async function getDashboardStats() {
  const papers = await getPapers();
  const gaps = await getGaps();
  const taxonomy = await getTaxonomy();

  const totalPapers = papers.length;
  const avgScore = papers.reduce((acc, p) => acc + p.globalScore, 0) / (totalPapers || 1);
  const totalCitations = papers.reduce((acc, p) => acc + p.citationCount, 0);
  
  const years = papers.map(p => p.year).filter(y => y > 0);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = `${minYear} - ${maxYear}`;

  const ragPapers = papers.filter(p => p.usesRAG).length;
  const biomedPapers = papers.filter(p => p.biomedicalScore > 80).length;

  return {
    totalPapers,
    avgScore: Math.round(avgScore * 10) / 10,
    totalCitations,
    yearRange,
    categoriesCount: taxonomy.length,
    gapsIdentified: gaps.length,
    ragPapers,
    biomedPapers
  };
}
