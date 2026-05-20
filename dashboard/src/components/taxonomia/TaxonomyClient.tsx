"use client";

import { useState } from "react";
import { FolderTree, Tag, BookOpen, ChevronRight, FileText, ExternalLink } from "lucide-react";
import { TaxonomyCategory, Paper } from "@/types";

export function TaxonomyClient({ taxonomy, papers }: { taxonomy: TaxonomyCategory[], papers: Paper[] }) {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  // Recalculate true counts dynamically
  const getPapersForCat = (catName: string, catNameEs: string) => {
    return papers.filter(p => p.category === catName || p.category === catNameEs || p.mainTopic === catName || p.mainTopic === catNameEs);
  };

  const dynamicTaxonomy = taxonomy.map(cat => ({
    ...cat,
    trueCount: getPapersForCat(cat.name, cat.nameEs).length
  }));

  const activeCat = dynamicTaxonomy.find(c => c.id === selectedCat);
  const activePapers = activeCat ? getPapersForCat(activeCat.name, activeCat.nameEs) : [];

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text flex items-center gap-3">
          <FolderTree className="text-primary-500" size={32} />
          Taxonomía Estructural Interactiva
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1 max-w-3xl">
          Selecciona cualquier categoría para explorar todos los documentos ({papers.length} en total) indexados dentro de ese eje temático.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dynamicTaxonomy.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => setSelectedCat(cat.id === selectedCat ? null : cat.id)}
            className={`glass-card flex flex-col h-full text-left transition-all duration-300 ${
              selectedCat === cat.id 
                ? 'ring-2 ring-primary-500 scale-[1.02] shadow-xl' 
                : 'hover:-translate-y-1 hover:shadow-md'
            }`}
          >
            <div className="p-6 border-b border-academic-light-border dark:border-academic-dark-border" style={{ borderTop: `4px solid ${cat.color}` }}>
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-xl font-bold transition-colors ${selectedCat === cat.id ? 'text-primary-600 dark:text-primary-400' : 'text-academic-light-text dark:text-academic-dark-text'}`}>
                  {cat.nameEs}
                </h3>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-academic-light-surface dark:bg-academic-dark-surface border border-academic-light-border dark:border-academic-dark-border shadow-sm shrink-0">
                  <BookOpen size={14} className="text-academic-light-muted dark:text-academic-dark-muted" />
                  <span className="text-xs font-mono font-bold text-academic-light-text dark:text-academic-dark-text">{cat.trueCount}</span>
                </div>
              </div>
              <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted leading-relaxed">
                {cat.description}
              </p>
            </div>
            
            <div className="p-6 bg-academic-light-surface/30 dark:bg-academic-dark-surface/30 flex-1">
              <h4 className="text-xs font-semibold text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider mb-3 flex items-center gap-2">
                <Tag size={14} /> Subcategorías (Keywords)
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.subcategories.map((sub, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2.5 py-1.5 rounded-md bg-white dark:bg-academic-dark-bg border border-academic-light-border dark:border-academic-dark-border text-academic-light-text dark:text-academic-dark-text font-medium shadow-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Indicador de expansión */}
            <div className={`py-2 flex justify-center border-t border-academic-light-border dark:border-academic-dark-border bg-academic-light-surface/50 dark:bg-academic-dark-surface/50 transition-colors ${selectedCat === cat.id ? 'text-primary-500' : 'text-academic-light-muted dark:text-academic-dark-muted'}`}>
               <span className="text-xs font-semibold">{selectedCat === cat.id ? 'Cerrar Categoría' : 'Ver Documentos'}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lista de Documentos Dinámica */}
      {selectedCat && activeCat && (
        <div className="mt-12 animate-slide-up">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-academic-light-border dark:border-academic-dark-border" style={{ borderColor: activeCat.color }}>
            <h3 className="text-2xl font-bold text-academic-light-text dark:text-academic-dark-text">
              Documentos en <span style={{ color: activeCat.color }}>{activeCat.nameEs}</span>
            </h3>
            <span className="px-3 py-1 bg-academic-light-surface dark:bg-academic-dark-surface rounded-full text-sm font-bold">
              {activePapers.length} papers
            </span>
          </div>

          {activePapers.length === 0 ? (
            <div className="p-12 text-center glass-card">
              <p className="text-academic-light-muted dark:text-academic-dark-muted text-lg">No hay documentos clasificados explícitamente en esta categoría aún.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activePapers.map((paper) => (
                <a 
                  key={paper.id} 
                  href={paper.url !== "N/A" ? paper.url : "#"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-5 glass-card hover:border-primary-500/50 hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-semibold text-academic-light-text dark:text-academic-dark-text leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {paper.title}
                    </h4>
                    <ExternalLink size={16} className="text-academic-light-muted dark:text-academic-dark-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted mb-3 flex-1 line-clamp-2">
                    {paper.authors.join(", ")}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-academic-light-border dark:border-academic-dark-border">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">
                      {paper.year}
                    </span>
                    {paper.pdfUrl !== "N/A" && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                        <FileText size={12} /> PDF Disponible
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
