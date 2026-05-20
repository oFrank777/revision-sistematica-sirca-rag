import { getPRISMA } from "@/lib/data";
import { Database, FileText, CheckCircle, Search, Filter, AlertTriangle } from "lucide-react";

export const dynamic = "force-static";

export default async function PrismaPage() {
  const prisma = await getPRISMA();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text">
          Flujo PRISMA 2020
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1 max-w-3xl">
          Diagrama de flujo de la revisión sistemática de literatura, documentando la identificación, cribado, elegibilidad e inclusión de los estudios.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-8 relative">
        {/* Connection lines background */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <div className="absolute left-1/2 top-24 bottom-24 w-1 bg-academic-light-border dark:bg-academic-dark-border -translate-x-1/2 z-0" />
        </div>

        {/* 1. Identification Phase */}
        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-glow-primary">1</div>
            <h3 className="text-xl font-bold text-academic-light-text dark:text-academic-dark-text uppercase tracking-widest">Identificación</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PrismaCard 
              icon={<Database />}
              title="Registros identificados en BDs"
              count={prisma.identification.databaseResults}
              subtitle="PubMed, Semantic Scholar, IEEE, arXiv"
              color="blue"
            />
            <PrismaCard 
              icon={<Search />}
              title="Registros de otras fuentes"
              count={prisma.identification.otherSources}
              subtitle="Búsqueda manual, referencias cruzadas"
              color="blue"
            />
          </div>
          
          <div className="flex justify-center mt-6">
            <PrismaCard 
              icon={<Filter />}
              title="Registros removidos (Duplicados)"
              count={prisma.identification.duplicatesRemoved}
              color="red"
              isSmall
            />
          </div>
        </div>

        {/* 2. Screening Phase */}
        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shadow-glow-secondary">2</div>
            <h3 className="text-xl font-bold text-academic-light-text dark:text-academic-dark-text uppercase tracking-widest">Cribado (Screening)</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="w-full md:w-1/2">
              <PrismaCard 
                icon={<FileText />}
                title="Registros cribados"
                count={prisma.screening.recordsScreened}
                color="purple"
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <PrismaExclusionCard 
                title="Registros Excluidos"
                count={prisma.screening.recordsExcluded}
                reasons={prisma.screening.excludedReasons}
              />
            </div>
          </div>
        </div>

        {/* 3. Eligibility Phase */}
        <div className="relative z-10 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shadow-glow-accent">3</div>
            <h3 className="text-xl font-bold text-academic-light-text dark:text-academic-dark-text uppercase tracking-widest">Elegibilidad</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="w-full md:w-1/2">
              <PrismaCard 
                icon={<FileText />}
                title="Textos completos evaluados"
                count={prisma.eligibility.fullTextAssessed}
                color="orange"
              />
            </div>
            
            <div className="w-full md:w-1/2">
              <PrismaExclusionCard 
                title="Textos completos excluidos"
                count={prisma.eligibility.fullTextExcluded}
                reasons={prisma.eligibility.excludedReasons}
              />
            </div>
          </div>
        </div>

        {/* 4. Inclusion Phase */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center font-bold" style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}>4</div>
            <h3 className="text-xl font-bold text-academic-light-text dark:text-academic-dark-text uppercase tracking-widest">Inclusión</h3>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full md:w-2/3">
              <div className="glass-card p-8 border-2 border-green-500/50 dark:border-green-500/50 relative overflow-hidden text-center bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10">
                <div className="absolute -right-10 -top-10 text-green-500/10"><CheckCircle size={150} /></div>
                
                <h4 className="text-lg font-bold text-academic-light-text dark:text-academic-dark-text mb-2">Estudios incluidos en revisión cualitativa / cuantitativa</h4>
                <div className="text-6xl font-mono font-bold text-green-600 dark:text-green-400 my-4">
                  {prisma.inclusion.studiesIncluded}
                </div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  Papers validados e integrados en el dataset final de SIRCA-RAG
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrismaCard({ title, count, subtitle, icon, color, isSmall = false }: any) {
  const colorMap: any = {
    blue: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    red: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300',
    purple: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300',
    orange: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300',
  };

  return (
    <div className={`glass-card p-5 border-2 flex items-center gap-4 ${colorMap[color]} ${isSmall ? 'w-fit mx-auto' : 'w-full'}`}>
      <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20">
        {icon}
      </div>
      <div>
        <h4 className={`font-bold ${isSmall ? 'text-sm' : 'text-md'}`}>{title}</h4>
        <div className={`font-mono font-bold ${isSmall ? 'text-xl' : 'text-3xl'} mt-1`}>{count}</div>
        {subtitle && <p className="text-xs mt-1 opacity-80">{subtitle}</p>}
      </div>
    </div>
  );
}

function PrismaExclusionCard({ title, count, reasons }: any) {
  return (
    <div className="glass-card border-2 border-red-200 dark:border-red-800/50 bg-red-50/30 dark:bg-red-900/5 w-full h-full p-5">
      <div className="flex justify-between items-start mb-4 border-b border-red-200 dark:border-red-800/50 pb-3">
        <h4 className="font-bold text-red-800 dark:text-red-300 flex items-center gap-2">
          <AlertTriangle size={18} /> {title}
        </h4>
        <span className="font-mono font-bold text-xl text-red-700 dark:text-red-400">{count}</span>
      </div>
      <ul className="space-y-2">
        {reasons.map((r: any, i: number) => (
          <li key={i} className="flex justify-between text-xs items-center p-2 rounded bg-white/50 dark:bg-black/20 text-red-900 dark:text-red-200">
            <span>{r.reason}</span>
            <span className="font-mono font-bold">{r.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
