import { getGaps, getPapers } from "@/lib/data";
import { AlertTriangle, AlertCircle, Info, ChevronRight, Target } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-static";

export default async function GapsPage() {
  const gaps = await getGaps();
  const papers = await getPapers();

  // Helper to get paper title by id
  const getPaperTitle = (id: string) => papers.find(p => p.id === id)?.title || id;

  const severityIcon = (severity: string) => {
    switch (severity) {
      case 'Crítico': return <AlertTriangle className="text-red-500" size={18} />;
      case 'Alto': return <AlertCircle className="text-orange-500" size={18} />;
      case 'Medio': return <Info className="text-yellow-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  const severityClass = (severity: string) => {
    switch (severity) {
      case 'Crítico': return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300";
      case 'Alto': return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300";
      case 'Medio': return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300";
      default: return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text">
          Análisis de Gaps de Investigación
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1 max-w-3xl">
          Identificación sistemática de vacíos en la literatura actual y cómo la arquitectura SIRCA-RAG aborda cada uno de ellos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {gaps.sort((a, b) => b.impact - a.impact).map((gap) => (
          <div key={gap.id} className="glass-card overflow-hidden">
            <div className={`px-6 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              gap.severity === 'Crítico' ? 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10' :
              gap.severity === 'Alto' ? 'border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-900/10' :
              'border-academic-light-border dark:border-academic-dark-border bg-academic-light-surface/50 dark:bg-academic-dark-surface/50'
            }`}>
              <div className="flex items-start gap-3">
                <div className="mt-1">{severityIcon(gap.severity)}</div>
                <div>
                  <h3 className="font-bold text-lg text-academic-light-text dark:text-academic-dark-text">{gap.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-academic-dark-bg border border-academic-light-border dark:border-academic-dark-border text-academic-light-muted dark:text-academic-dark-muted">
                      {gap.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${severityClass(gap.severity)}`}>
                      Severidad: {gap.severity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider font-semibold">Impacto</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-academic-light-border dark:bg-academic-dark-border rounded-full overflow-hidden">
                      <div className={`h-full ${
                        gap.impact >= 90 ? 'bg-red-500' : 
                        gap.impact >= 80 ? 'bg-orange-500' : 'bg-yellow-500'
                      }`} style={{ width: `${gap.impact}%` }}></div>
                    </div>
                    <span className="font-mono text-sm font-bold">{gap.impact}/100</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider mb-2">Descripción del Problema</h4>
                  <p className="text-sm leading-relaxed text-academic-light-text dark:text-academic-dark-text">
                    {gap.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider mb-2">Dirección Futura Recomendada</h4>
                  <p className="text-sm leading-relaxed text-academic-light-text dark:text-academic-dark-text italic border-l-2 border-academic-light-border dark:border-academic-dark-border pl-3">
                    {gap.futureDirection}
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-primary-700 dark:text-primary-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Target size={16} /> Contribución SIRCA-RAG
                  </h4>
                  <p className="text-sm leading-relaxed text-primary-900 dark:text-primary-100 font-medium">
                    {gap.sircaContribution}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider mb-2">Literatura Relevante</h4>
                  <ul className="space-y-2">
                    {gap.relatedPapers.map(paperId => (
                      <li key={paperId}>
                        <Link href={`/papers?search=${paperId}`} className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-start gap-2 group">
                          <ChevronRight size={16} className="shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                          <span className="line-clamp-2">{getPaperTitle(paperId)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
