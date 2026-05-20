"use client";

import React, { useState, useMemo } from "react";
import { Paper, TaxonomyCategory } from "@/types";
import { Search, Filter, ArrowUpDown, ExternalLink, Star, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  initialPapers: Paper[];
  taxonomy: TaxonomyCategory[];
}

export default function PaperTableClient({ initialPapers, taxonomy }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortField, setSortField] = useState<keyof Paper>("globalScore");
  const [sortAsc, setSortAsc] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredAndSortedPapers = useMemo(() => {
    let result = [...initialPapers];

    // Filter by search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerSearch) || 
        p.authors.some(a => a.toLowerCase().includes(lowerSearch)) ||
        p.keywords.some(k => k.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return 0;
    });

    return result;
  }, [initialPapers, searchTerm, selectedCategory, sortField, sortAsc]);

  const handleSort = (field: keyof Paper) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // Default desc for scores/years, could be smarter
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Filters Bar */}
      <div className="p-4 border-b border-academic-light-border dark:border-academic-dark-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/50 dark:bg-academic-dark-surface/50">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-academic-light-muted dark:text-academic-dark-muted" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por título, autor o keyword..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-academic-dark-bg border border-academic-light-border dark:border-academic-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter size={18} className="text-academic-light-muted dark:text-academic-dark-muted" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white dark:bg-academic-dark-bg border border-academic-light-border dark:border-academic-dark-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            <option value="All">Todas las Categorías</option>
            {taxonomy.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <span className="text-xs font-mono text-academic-light-muted dark:text-academic-dark-muted whitespace-nowrap">
            {filteredAndSortedPapers.length} papers
          </span>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="sticky top-0 bg-academic-light-surface dark:bg-academic-dark-surface border-b border-academic-light-border dark:border-academic-dark-border shadow-sm z-10">
            <tr>
              <th className="p-4 w-10"></th>
              <th className="p-4 font-semibold text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors" onClick={() => handleSort('title')}>
                <div className="flex items-center gap-2">Título <ArrowUpDown size={14} className="opacity-50" /></div>
              </th>
              <th className="p-4 font-semibold text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors w-32" onClick={() => handleSort('year')}>
                <div className="flex items-center gap-2">Año <ArrowUpDown size={14} className="opacity-50" /></div>
              </th>
              <th className="p-4 font-semibold text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors w-48" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-2">Categoría <ArrowUpDown size={14} className="opacity-50" /></div>
              </th>
              <th className="p-4 font-semibold text-sm cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors w-24 text-center" onClick={() => handleSort('globalScore')}>
                <div className="flex items-center justify-center gap-2">Score <ArrowUpDown size={14} className="opacity-50" /></div>
              </th>
              <th className="p-4 font-semibold text-sm w-24 text-center">Enlace</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-academic-light-border dark:divide-academic-dark-border">
            {filteredAndSortedPapers.map((paper) => (
              <React.Fragment key={paper.id}>
                <tr className={`hover:bg-academic-light-surface/50 dark:hover:bg-academic-dark-surface/50 transition-colors group cursor-pointer ${expandedRow === paper.id ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`} onClick={() => toggleExpand(paper.id)}>
                  <td className="p-4 text-center text-academic-light-muted dark:text-academic-dark-muted">
                    {expandedRow === paper.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-sm line-clamp-2 text-academic-light-text dark:text-academic-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{paper.title}</p>
                    <p className="text-xs text-academic-light-muted dark:text-academic-dark-muted mt-1 truncate max-w-md">{paper.authors[0]} et al. • {paper.venue}</p>
                  </td>
                  <td className="p-4 text-sm font-mono">{paper.year}</td>
                  <td className="p-4">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-academic-light-surface dark:bg-academic-dark-surface border border-academic-light-border dark:border-academic-dark-border inline-block truncate max-w-[150px]">
                      {paper.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5 font-mono text-sm font-bold">
                      <Star size={14} className={paper.globalScore >= 90 ? "fill-yellow-500 text-yellow-500" : "fill-academic-light-muted text-academic-light-muted"} />
                      <span className={paper.globalScore >= 90 ? "text-yellow-600 dark:text-yellow-400" : ""}>{paper.globalScore}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-lg bg-academic-light-surface dark:bg-academic-dark-surface border border-academic-light-border dark:border-academic-dark-border hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors" title="Abrir Paper Original">
                      <ExternalLink size={16} />
                    </a>
                  </td>
                </tr>
                
                {/* Expanded Details Row */}
                {expandedRow === paper.id && (
                  <tr>
                    <td colSpan={6} className="p-0 border-b border-academic-light-border dark:border-academic-dark-border bg-white dark:bg-academic-dark-bg/50">
                      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <h4 className="text-xs font-semibold text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider mb-2">Resumen Sintetizado (SIRCA-RAG)</h4>
                            <p className="text-sm leading-relaxed">{paper.abstractSynthesized}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-academic-light-surface dark:bg-academic-dark-surface p-3 rounded-lg border border-academic-light-border dark:border-academic-dark-border">
                              <span className="block text-xs text-academic-light-muted dark:text-academic-dark-muted mb-1">Contribución Principal</span>
                              <span className="text-sm font-medium">{paper.scientificContribution}</span>
                            </div>
                            <div className="bg-academic-light-surface dark:bg-academic-dark-surface p-3 rounded-lg border border-academic-light-border dark:border-academic-dark-border">
                              <span className="block text-xs text-academic-light-muted dark:text-academic-dark-muted mb-1">Relevancia para SIRCA-RAG</span>
                              <span className="text-sm font-medium">{paper.relevanceToSIRCA}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-semibold text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider mb-2">Palabras Clave</h4>
                            <div className="flex flex-wrap gap-2">
                              {paper.keywords.map((kw, i) => (
                                <span key={i} className="text-xs px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded border border-primary-100 dark:border-primary-800/50">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-academic-light-surface dark:bg-academic-dark-surface p-4 rounded-xl border border-academic-light-border dark:border-academic-dark-border">
                            <h4 className="font-semibold text-sm mb-4 border-b border-academic-light-border dark:border-academic-dark-border pb-2">Evaluación Técnica</h4>
                            
                            <div className="space-y-3">
                              <ScoreRow label="Score Global" score={paper.globalScore} color="bg-gradient-to-r from-primary-500 to-secondary-500" />
                              <ScoreRow label="Técnico" score={paper.technicalScore} color="bg-blue-500" />
                              <ScoreRow label="Biomédico" score={paper.biomedicalScore} color="bg-green-500" />
                              <ScoreRow label="Innovación" score={paper.innovationScore} color="bg-purple-500" />
                              <ScoreRow label="Relevancia" score={paper.relevanceScore} color="bg-accent-500" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 border border-academic-light-border dark:border-academic-dark-border rounded flex flex-col">
                              <span className="text-academic-light-muted dark:text-academic-dark-muted mb-1">Citas Totales</span>
                              <span className="font-mono font-bold text-sm">{paper.citationCount}</span>
                            </div>
                            <div className="p-2 border border-academic-light-border dark:border-academic-dark-border rounded flex flex-col">
                              <span className="text-academic-light-muted dark:text-academic-dark-muted mb-1">Nivel Innovación</span>
                              <span className="font-bold text-sm">{paper.innovationLevel}</span>
                            </div>
                            <div className="p-2 border border-academic-light-border dark:border-academic-dark-border rounded flex flex-col">
                              <span className="text-academic-light-muted dark:text-academic-dark-muted mb-1">Usa RAG</span>
                              <span className="font-bold text-sm">{paper.usesRAG ? "Sí" : "No"}</span>
                            </div>
                            <div className="p-2 border border-academic-light-border dark:border-academic-dark-border rounded flex flex-col">
                              <span className="text-academic-light-muted dark:text-academic-dark-muted mb-1">Usa LLM</span>
                              <span className="font-bold text-sm truncate" title={paper.llmType}>{paper.llmType || "No"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScoreRow({ label, score, color }: { label: string, score: number, color: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-academic-light-muted dark:text-academic-dark-muted w-20">{label}</span>
      <div className="flex-1 mx-3 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono font-bold w-6 text-right">{score}</span>
    </div>
  );
}
