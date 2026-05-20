"use client";

import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Bell, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import papersData from "../../../public/data/papers.json";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  
  const papersCount = papersData.length;
  
  // Mapear rutas a títulos
  const getPageTitle = () => {
    switch(pathname) {
      case "/": return "Ecosistema de Revisión Sistemática";
      case "/papers": return "Explorador de Papers";
      case "/visualizaciones": return "Visualizaciones Científicas";
      case "/gaps": return "Análisis de Gaps";
      case "/red": return "Red de Citación";
      case "/prisma": return "Flujo PRISMA";
      case "/taxonomia": return "Taxonomía";
      case "/metodologia": return "Metodología DSR";
      case "/exportar": return "Centro de Exportación";
      default: return "SIRCA-RAG Dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between px-8 bg-white/70 dark:bg-academic-dark-bg/70 backdrop-blur-md border-b border-academic-light-border dark:border-academic-dark-border">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold tracking-tight text-academic-light-text dark:text-academic-dark-text">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Stats Badges */}
        <div className="hidden md:flex items-center gap-3 mr-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-xs font-medium text-primary-600 dark:text-primary-400">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
            {papersCount} Papers Validados
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 text-xs font-medium text-green-600 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            PRISMA Completo
          </div>
        </div>

        <button 
          className="p-2 rounded-full hover:bg-academic-light-surface dark:hover:bg-academic-dark-surface text-academic-light-muted dark:text-academic-dark-muted transition-colors relative"
          title="Notificaciones"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500 border border-white dark:border-academic-dark-bg"></span>
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-academic-light-surface dark:hover:bg-academic-dark-surface text-academic-light-muted dark:text-academic-dark-muted transition-colors"
          title={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <div className="h-8 w-px bg-academic-light-border dark:bg-academic-dark-border mx-1"></div>
        
        <button className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-academic-light-surface dark:hover:bg-academic-dark-surface transition-colors border border-transparent hover:border-academic-light-border dark:hover:border-academic-dark-border">
          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-secondary-500 to-primary-500 flex items-center justify-center text-white text-xs font-bold">
            IP
          </div>
          <span className="text-sm font-medium text-academic-light-text dark:text-academic-dark-text hidden sm:block">
            Investigador Principal
          </span>
        </button>
      </div>
    </header>
  );
}
