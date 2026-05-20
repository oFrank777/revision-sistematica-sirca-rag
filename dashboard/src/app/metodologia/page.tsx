import { BookOpen, CheckCircle, Database, LayoutTemplate, PenTool, TestTube } from "lucide-react";
import papersData from "../../../public/data/papers.json";



export default function MethodologyPage() {
  const dsrPhases = [
    {
      id: "P1",
      title: "Explicación del Problema",
      icon: <Database className="text-blue-500" size={24} />,
      color: "border-blue-500",
      bg: "bg-blue-50 dark:bg-blue-900/10",
      description: "Identificación de la limitación de los LLMs (alucinaciones) y los sistemas RAG tradicionales en el dominio de las plantas medicinales.",
      activities: [
        "Revisión Sistemática de Literatura (SLR)",
        "Análisis de gaps en arquitecturas RAG",
        "Estudio de las necesidades de botánicos y farmacólogos"
      ]
    },
    {
      id: "P2",
      title: "Definición de Objetivos",
      icon: <LayoutTemplate className="text-purple-500" size={24} />,
      color: "border-purple-500",
      bg: "bg-purple-50 dark:bg-purple-900/10",
      description: "Establecimiento de los requisitos formales del sistema para mitigar los problemas identificados.",
      activities: [
        "Requisito de Memoria Persistente (Vectores + Grafo)",
        "Requisito de Recuperación Continua (Adquisición autónoma)",
        "Requisito de Razonamiento Semi-autónomo (Agentes)"
      ]
    },
    {
      id: "P3",
      title: "Diseño y Desarrollo",
      icon: <PenTool className="text-orange-500" size={24} />,
      color: "border-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/10",
      description: "Creación de la arquitectura de software propuesta (Componentes C1 a C5).",
      activities: [
        "C1: Capa de Orquestación y Enrutamiento Híbrido",
        "C2: Pipeline de Ingestión y Vectorización (Chunking avanzado)",
        "C3: Motor de Inferencia RAG (Agente React/Plan-and-Solve)",
        "C4: Módulo de Actualización Científica Autónoma",
        "C5: Interfaz de Respuesta Grounded"
      ]
    },
    {
      id: "P4",
      title: "Demostración",
      icon: <TestTube className="text-green-500" size={24} />,
      color: "border-green-500",
      bg: "bg-green-50 dark:bg-green-900/10",
      description: "Aplicación de la arquitectura a un caso de uso práctico: Plantas Medicinales Peruanas.",
      activities: [
        "Implementación del prototipo MVP",
        `Ingesta de ${papersData.length} papers de validación`,
        "Demostración de queries complejas de etnobotánica"
      ]
    },
    {
      id: "P5",
      title: "Evaluación",
      icon: <CheckCircle className="text-red-500" size={24} />,
      color: "border-red-500",
      bg: "bg-red-50 dark:bg-red-900/10",
      description: "Validación cuantitativa y cualitativa de los resultados obtenidos por el artefacto.",
      activities: [
        "Métricas RAGAS (Faithfulness, Answer Relevance)",
        "Comparación de Latencia Híbrida vs Densa",
        "Precisión de extracción de relaciones Planta-Beneficio"
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-academic-light-text dark:text-academic-dark-text flex items-center gap-3">
          <BookOpen className="text-primary-500" size={32} />
          Metodología Design Science Research (DSR)
        </h2>
        <p className="text-academic-light-muted dark:text-academic-dark-muted mt-2 max-w-4xl text-lg">
          La investigación y desarrollo del sistema SIRCA-RAG sigue rigurosamente el paradigma de Design Science Research, cuyo objetivo es la creación y evaluación de un artefacto TI innovador para resolver problemas organizacionales o científicos reales.
        </p>
      </div>

      <div className="relative mt-12">
        {/* Línea conectora central vertical (oculta en móvil) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-academic-light-border dark:bg-academic-dark-border -translate-x-1/2 hidden md:block z-0" />

        <div className="space-y-12">
          {dsrPhases.map((phase, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={phase.id} className={`relative z-10 flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Lado izquierdo (o derecho) de contenido */}
                <div className={`w-full md:w-[45%] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-xl font-bold text-academic-light-text dark:text-academic-dark-text mb-2">{phase.title}</h3>
                  <p className="text-academic-light-muted dark:text-academic-dark-muted text-sm leading-relaxed mb-4">
                    {phase.description}
                  </p>
                  
                  <ul className={`space-y-2 text-sm text-academic-light-text dark:text-academic-dark-text inline-block ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    {phase.activities.map((act, i) => (
                      <li key={i} className={`flex items-start gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        {isEven && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-academic-light-border dark:bg-academic-dark-border mt-1.5 shrink-0" />}
                        <span className="font-medium bg-academic-light-surface/50 dark:bg-academic-dark-surface/50 px-2 py-1 rounded border border-academic-light-border dark:border-academic-dark-border">{act}</span>
                        {!isEven && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-academic-light-border dark:bg-academic-dark-border mt-1.5 shrink-0" />}
                        {/* Indicadores en móvil */}
                        <span className="md:hidden inline-block w-1.5 h-1.5 rounded-full bg-academic-light-border dark:bg-academic-dark-border mt-1.5 shrink-0" />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nodo central */}
                <div className="w-full md:w-[10%] flex justify-center shrink-0 my-4 md:my-0 relative">
                  <div className={`w-16 h-16 rounded-full bg-white dark:bg-academic-dark-card border-4 ${phase.color} shadow-lg flex items-center justify-center relative z-20`}>
                    <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-academic-light-border dark:bg-academic-dark-border text-[10px] font-bold flex items-center justify-center text-academic-light-text dark:text-academic-dark-text border-2 border-white dark:border-academic-dark-bg">
                      {phase.id}
                    </div>
                    {phase.icon}
                  </div>
                </div>

                {/* Espacio vacío para equilibrar el grid */}
                <div className="w-full md:w-[45%] hidden md:block"></div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
