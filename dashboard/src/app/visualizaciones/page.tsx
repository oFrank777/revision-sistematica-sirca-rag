import { getPapers, getTaxonomy } from "@/lib/data";
import { TimelineChart, CategoryRadarChart, TrendLineChart } from "@/components/visualizations/Charts";

export const dynamic = "force-static";

export default async function VisualizationsPage() {
  const papers = await getPapers();
  const taxonomy = await getTaxonomy();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text">
          Visualizaciones Científicas
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-1 max-w-3xl">
          Análisis gráfico de la literatura recopilada, mostrando tendencias de publicación, distribución de impacto y cobertura taxonómica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Chart */}
        <div className="glass-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Publicaciones por Año</h3>
            <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted mt-1">
              Volumen de papers publicados anualmente (2018-2026)
            </p>
          </div>
          <TimelineChart papers={papers} />
        </div>

        {/* Radar Chart */}
        <div className="glass-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Distribución de Calidad por Categoría</h3>
            <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted mt-1">
              Score global promedio por área taxonómica
            </p>
          </div>
          <CategoryRadarChart papers={papers} taxonomy={taxonomy} />
        </div>

        {/* Trend Line Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Tendencia de Impacto Académico</h3>
            <p className="text-sm text-academic-light-muted dark:text-academic-dark-muted mt-1">
              Promedio de citaciones totales de los papers publicados en cada año
            </p>
          </div>
          <TrendLineChart papers={papers} />
        </div>
      </div>
    </div>
  );
}
