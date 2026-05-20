import { getDashboardStats, getPapers, getTaxonomy } from "@/lib/data";
import { BookOpen, Target, Network, Layers, Star, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Forzamos que la página sea estática pero que pueda usar los datos
export const dynamic = "force-static";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const papers = await getPapers();
  const taxonomy = await getTaxonomy();

  // Sort papers by global score for the "Top Papers" list
  const topPapers = [...papers].sort((a, b) => b.globalScore - a.globalScore).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text">
            Panel de Control
          </h2>
          <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1">
            Resumen general de la revisión sistemática para el proyecto SIRCA-RAG.
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/exportar" 
            className="px-4 py-2 bg-white dark:bg-academic-dark-card border border-academic-light-border dark:border-academic-dark-border text-academic-light-text dark:text-academic-dark-text rounded-lg shadow-sm hover:shadow-md transition-all font-medium text-sm flex items-center gap-2"
          >
            Descargar Reporte
          </Link>
          <Link 
            href="/papers" 
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all font-medium text-sm flex items-center gap-2"
          >
            Explorar Papers
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Papers Analizados" 
          value={stats.totalPapers.toString()} 
          subtitle={`Periodo: ${stats.yearRange}`}
          icon={<BookOpen className="text-primary-500" />} 
          trend="+12%"
          color="primary"
        />
        <KPICard 
          title="Score Promedio" 
          value={stats.avgScore.toString()} 
          subtitle="Escala 0-100"
          icon={<Star className="text-yellow-500" />} 
          trend="+5%"
          color="yellow"
        />
        <KPICard 
          title="Citaciones Totales" 
          value={stats.totalCitations.toLocaleString()} 
          subtitle="Impacto Académico"
          icon={<Award className="text-secondary-500" />} 
          trend="Alto"
          color="secondary"
        />
        <KPICard 
          title="Gaps Identificados" 
          value={stats.gapsIdentified.toString()} 
          subtitle="Oportunidades SIRCA"
          icon={<Target className="text-accent-500" />} 
          trend="Crítico"
          color="accent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Top Papers List */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Top Papers por Relevancia</h3>
            <Link href="/papers" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center">
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-4 flex-1">
            {topPapers.map((paper, idx) => (
              <div key={paper.id} className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-academic-light-border dark:border-academic-dark-border bg-academic-light-surface/50 dark:bg-academic-dark-surface/50 hover:bg-white dark:hover:bg-academic-dark-card transition-all">
                <div className="flex items-start gap-4 mr-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-sm">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" title={paper.title}>
                      {paper.title}
                    </h4>
                    <p className="text-xs text-academic-light-muted dark:text-academic-dark-muted mt-1">
                      {paper.authors[0]} et al. • {paper.year} • {paper.venue}
                    </p>
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center gap-3 shrink-0">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-academic-light-surface dark:bg-academic-dark-surface border border-academic-light-border dark:border-academic-dark-border">
                    {paper.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-primary-600 dark:text-primary-400">
                    <Star size={14} className="fill-current" />
                    {paper.globalScore}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taxonomy Distribution */}
        <div className="glass-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Cobertura Temática</h3>
            <Layers className="text-academic-light-muted dark:text-academic-dark-muted" size={20} />
          </div>
          
          <div className="flex-1 space-y-4">
            {taxonomy.slice(0, 6).map((cat) => {
              const percentage = Math.round((cat.paperCount / stats.totalPapers) * 100);
              return (
                <div key={cat.id} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-academic-light-muted dark:text-academic-dark-muted font-mono">{cat.paperCount}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-academic-light-surface dark:bg-academic-dark-surface overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
            
            <div className="pt-4 mt-2 border-t border-academic-light-border dark:border-academic-dark-border">
              <Link href="/taxonomia" className="text-sm text-center block w-full text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                Ver Taxonomía Completa →
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

function KPICard({ title, value, subtitle, icon, trend, color }: any) {
  return (
    <div className="glass-card p-5 group relative overflow-hidden">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500
        ${color === 'primary' ? 'bg-primary-500' : 
          color === 'secondary' ? 'bg-secondary-500' : 
          color === 'accent' ? 'bg-accent-500' : 'bg-yellow-500'}`} 
      />
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-academic-light-muted dark:text-academic-dark-muted mb-1">{title}</p>
          <h4 className="text-3xl font-bold font-mono tracking-tight">{value}</h4>
        </div>
        <div className={`p-2.5 rounded-lg bg-white dark:bg-academic-dark-surface shadow-sm border border-academic-light-border dark:border-academic-dark-border`}>
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-academic-light-muted dark:text-academic-dark-muted">{subtitle}</span>
        <span className={`font-semibold px-2 py-0.5 rounded-full 
          ${trend.startsWith('+') || trend === 'Alto' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
            trend === 'Crítico' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
