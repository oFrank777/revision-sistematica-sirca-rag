import { getPapers, getTaxonomy } from "@/lib/data";
import PaperTableClient from "./PaperTableClient";



export default async function PapersExplorerPage() {
  const papers = await getPapers();
  const taxonomy = await getTaxonomy();

  return (
    <div className="space-y-6 animate-fade-in flex flex-col h-[calc(100vh-8rem)]">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text">
          Explorador de Literatura Científica
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1">
          Base de datos completa de papers recopilados para la revisión sistemática SIRCA-RAG.
        </p>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex flex-col">
        {/* Usamos un Client Component para interactividad */}
        <PaperTableClient initialPapers={papers} taxonomy={taxonomy} />
      </div>
    </div>
  );
}
