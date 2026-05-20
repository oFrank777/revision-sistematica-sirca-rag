"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  Target, 
  Network, 
  GitMerge, 
  FolderTree, 
  BookOpen, 
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "inicio", label: "Dashboard", href: "/", icon: LayoutDashboard },
  { id: "explorador", label: "Explorador de Papers", href: "/papers", icon: Search },
  { id: "visualizaciones", label: "Visualizaciones", href: "/visualizaciones", icon: BarChart3 },
  { id: "gaps", label: "Análisis de Gaps", href: "/gaps", icon: Target },
  { id: "red", label: "Red de Citación", href: "/red", icon: Network },
  { id: "prisma", label: "Flujo PRISMA", href: "/prisma", icon: GitMerge },
  { id: "taxonomia", label: "Taxonomía", href: "/taxonomia", icon: FolderTree },
  { id: "metodologia", label: "Metodología", href: "/metodologia", icon: BookOpen },
  { id: "exportar", label: "Exportar Datos", href: "/exportar", icon: Download },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-academic-light-border dark:border-academic-dark-border bg-white/80 dark:bg-academic-dark-card/80 backdrop-blur-lg flex flex-col
        ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-academic-light-border dark:border-academic-dark-border">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-glow-primary">
              SR
            </div>
            <span className="font-bold text-lg whitespace-nowrap text-academic-light-text dark:text-academic-dark-text tracking-tight">
              SIRCA<span className="text-primary-500 font-black">-RAG</span>
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shadow-glow-primary">
              SR
            </div>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-md hover:bg-academic-light-surface dark:hover:bg-academic-dark-surface text-academic-light-muted dark:text-academic-dark-muted transition-colors ${collapsed ? "absolute -right-3 bg-white dark:bg-academic-dark-card border border-academic-light-border dark:border-academic-dark-border shadow-sm" : ""}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <div className="space-y-1.5">
          <p className={`text-xs font-semibold text-academic-light-muted dark:text-academic-dark-muted uppercase tracking-wider mb-3 px-2 ${collapsed ? "text-center text-[10px]" : ""}`}>
            {collapsed ? "Menu" : "Navegación Científica"}
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
                  ${isActive 
                    ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium" 
                    : "text-academic-light-muted dark:text-academic-dark-muted hover:bg-academic-light-surface dark:hover:bg-academic-dark-surface hover:text-academic-light-text dark:hover:text-academic-dark-text"
                  }
                  ${collapsed ? "justify-center px-0" : ""}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className={`shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                {!collapsed && <span className="text-sm">{item.label}</span>}
                
                {isActive && !collapsed && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary-500" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-academic-light-border dark:border-academic-dark-border">
        {!collapsed ? (
          <div className="text-xs text-academic-light-muted dark:text-academic-dark-muted text-center">
            <p>Estado del Arte v1.0</p>
            <p className="mt-1">DSR Fase 1</p>
          </div>
        ) : (
          <div className="text-xs text-center text-academic-light-muted dark:text-academic-dark-muted font-bold">
            v1.0
          </div>
        )}
      </div>
    </aside>
  );
}
