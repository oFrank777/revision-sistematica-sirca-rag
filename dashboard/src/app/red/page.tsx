import { getPapers } from "@/lib/data";
import { Network, Link as LinkIcon, GitMerge, FileText } from "lucide-react";



export default async function NetworkPage() {
  const papers = await getPapers();
  
  // Sort by citations
  const topCited = [...papers].sort((a, b) => b.citationCount - a.citationCount).slice(0, 10);
  
  // Calcular métricas de red simuladas basadas en los datos reales
  const totalCitations = papers.reduce((acc, p) => acc + p.citationCount, 0);
  const avgCitations = Math.round(totalCitations / papers.length);
  const hIndex = topCited.filter((p, i) => p.citationCount >= i + 1).length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text flex items-center gap-3">
          <Network className="text-primary-500" size={32} />
          Red de Citaciones e Impacto
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1 max-w-3xl">
          Análisis del impacto bibliométrico de la literatura fundacional utilizada en SIRCA-RAG.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500">
            <LinkIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-academic-light-muted dark:text-academic-dark-muted">Nodos Centrales (Papers)</p>
            <h3 className="text-2xl font-bold font-mono">{papers.length}</h3>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500">
            <GitMerge size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-academic-light-muted dark:text-academic-dark-muted">Aristas (Citaciones Totales)</p>
            <h3 className="text-2xl font-bold font-mono">{totalCitations.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-academic-light-muted dark:text-academic-dark-muted">Índice h (Corpus)</p>
            <h3 className="text-2xl font-bold font-mono">{hIndex}</h3>
          </div>
        </div>
      </div>

      <div className="glass-card mt-8 overflow-hidden">
        <div className="p-6 border-b border-academic-light-border dark:border-academic-dark-border bg-academic-light-surface/50 dark:bg-academic-dark-surface/50">
          <h3 className="text-lg font-bold text-academic-light-text dark:text-academic-dark-text">Top 10 Nodos Más Influyentes</h3>
          <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted">Los artículos con mayor centralidad de grado (citaciones) en la red bibliográfica.</p>
        </div>
        
        <div className="divide-y divide-academic-light-border dark:divide-academic-dark-border">
          {topCited.map((paper, idx) => (
            <div key={paper.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-academic-light-surface/30 dark:hover:bg-academic-dark-surface/30 transition-colors">
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-primary-100 dark:border-primary-900/50 bg-white dark:bg-academic-dark-bg shadow-sm relative">
                <span className="text-2xl font-black text-primary-600 dark:text-primary-400 font-mono">{paper.citationCount}</span>
                <span className="text-[10px] uppercase font-bold text-academic-light-muted dark:text-academic-dark-muted">Citas</span>
                
                {/* Ranking Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-secondary-500 to-primary-500 text-white font-bold text-xs flex items-center justify-center shadow-lg">
                  #{idx + 1}
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-lg text-academic-light-text dark:text-academic-dark-text mb-1">{paper.title}</h4>
                <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted mb-3">
                  {paper.authors.join(", ")} • <span className="font-semibold">{paper.venue}</span> ({paper.year})
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2.5 py-1 rounded bg-academic-light-surface dark:bg-academic-dark-surface border border-academic-light-border dark:border-academic-dark-border font-medium">
                    {paper.category}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium border border-blue-200 dark:border-blue-800">
                    Evidencia: {paper.evidenceLevel}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium border border-purple-200 dark:border-purple-800">
                    Relevancia SIRCA: {paper.relevanceScore}/100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
