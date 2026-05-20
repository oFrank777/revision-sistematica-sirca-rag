import { getPapers } from "@/lib/data";
import ExportManager from "./ExportManager";
import { Download, Database, FileSpreadsheet, FileJson, Code } from "lucide-react";

export const dynamic = "force-static";

export default async function ExportPage() {
  const papers = await getPapers();

  return (
    <div className="space-y-6 animate-fade-in flex flex-col min-h-[calc(100vh-8rem)]">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text flex items-center gap-3">
          <Download className="text-primary-500" size={32} />
          Centro de Exportación de Datos
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1 max-w-3xl">
          Descargue el corpus completo de la revisión sistemática en múltiples formatos estandarizados para análisis de datos o importación a gestores de referencias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <FormatCard icon={<FileSpreadsheet />} title="Excel (XLSX)" description="Para análisis cuantitativo" color="text-green-500" />
        <FormatCard icon={<FileJson />} title="JSON" description="Para integración con APIs o LLMs" color="text-yellow-500" />
        <FormatCard icon={<Code />} title="BibTeX" description="Para LaTeX y Overleaf" color="text-blue-500" />
        <FormatCard icon={<Database />} title="RIS" description="Para Mendeley / Zotero" color="text-purple-500" />
      </div>

      <div className="flex-1 glass-card p-8">
        <ExportManager papers={papers} />
      </div>
    </div>
  );
}

function FormatCard({ icon, title, description, color }: any) {
  return (
    <div className="bg-white dark:bg-academic-dark-card border border-academic-light-border dark:border-academic-dark-border rounded-xl p-4 flex items-center gap-4">
      <div className={`p-3 rounded-lg bg-academic-light-surface dark:bg-academic-dark-surface ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm text-academic-light-text dark:text-academic-dark-text">{title}</h4>
        <p className="text-xs text-academic-light-muted dark:text-academic-dark-muted">{description}</p>
      </div>
    </div>
  );
}
