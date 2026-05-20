# SIRCA-RAG: Arquitectura Semi-Autónoma de Recuperación y Generación Contextual de Conocimiento Biomédico

[![LaTeX](https://img.shields.io/badge/LaTeX-IEEEtran-blue.svg)](https://www.ieee.org/)
[![License](https://img.shields.io/badge/License-Academic-green.svg)]()
[![Status](https://img.shields.io/badge/Status-En%20desarrollo-orange.svg)]()

## Descripción

Este repositorio contiene el proyecto LaTeX del artículo de investigación **SIRCA-RAG**, que propone una arquitectura semi-autónoma de descubrimiento científico biomédico mediante RAG continuo, memoria vectorial persistente y adquisición científica automatizada, aplicada al dominio de plantas medicinales peruanas.

**Tipo de investigación:** Research Architecture Paper / System Design Paper

**Dominio:** Inteligencia artificial biomédica, recuperación semántica de información, etnobotánica computacional.

## Estructura del Proyecto

```
PAPER/
│
├── main.tex                          # Documento principal (punto de entrada)
├── references.bib                    # Referencias bibliográficas (BibTeX)
├── README.md                         # Este archivo
│
├── sections/                         # Secciones modulares del artículo
│   ├── abstract.tex                  # Resumen y palabras clave
│   ├── introduction.tex              # Introducción
│   ├── problem_statement.tex         # Planteamiento del problema
│   ├── motivation.tex                # Motivación y justificación
│   ├── related_work.tex              # Trabajos relacionados
│   ├── theoretical_framework.tex     # Marco teórico
│   ├── methodology.tex               # Metodología
│   ├── architecture.tex              # Arquitectura del sistema
│   ├── experiments.tex               # Configuración experimental
│   ├── results.tex                   # Resultados
│   ├── discussion.tex                # Discusión
│   ├── future_work.tex               # Trabajo futuro
│   └── conclusion.tex                # Conclusiones
│
├── figures/                          # Figuras y diagramas
│   ├── sirca_architecture.png        # Arquitectura general del sistema
│   ├── rag_pipeline.png              # Pipeline RAG especializado
│   ├── vector_memory.png             # Arquitectura de memoria vectorial
│   └── biomedical_workflow.png       # Flujo de trabajo biomédico
│
├── tables/                           # Tablas en archivos separados
│   ├── related_work_table.tex        # Comparativa de trabajos relacionados
│   ├── comparison_table.tex          # Comparación de stack tecnológico
│   └── datasets_table.tex            # Fuentes y composición del corpus
│
├── algorithms/                       # Algoritmos IEEE
│   ├── rag_pipeline_algorithm.tex    # Algoritmo del pipeline RAG
│   └── ingestion_algorithm.tex       # Algoritmo de adquisición científica
│
├── styles/                           # Estilos y comandos personalizados
│   └── custom_commands.tex           # Comandos LaTeX del proyecto
│
└── appendix/                         # Apéndices
    └── appendix_a.tex                # Detalles complementarios
```

## Compilación

### Requisitos

- Distribución LaTeX completa (TeX Live 2022+ o MiKTeX)
- Clase `IEEEtran` (incluida en la mayoría de distribuciones)
- Paquetes: `babel`, `amsmath`, `graphicx`, `booktabs`, `algorithm2e`, `hyperref`, `listings`, entre otros.

### Compilación local

```bash
# Compilación completa con BibTeX
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
```

O con `latexmk` para compilación automatizada:

```bash
latexmk -pdf main.tex
```

### Compilación en Overleaf

1. Subir todo el contenido de la carpeta `PAPER/` a un nuevo proyecto en [Overleaf](https://www.overleaf.com/).
2. Configurar `main.tex` como documento principal.
3. Seleccionar compilador **pdfLaTeX**.
4. El proyecto compilará automáticamente con todas las dependencias.

## Formato

- **Estilo:** IEEE Conference (doble columna)
- **Idioma:** Español
- **Clase:** `IEEEtran` (conference mode)
- **Bibliografía:** BibTeX con estilo `IEEEtran`

## Componentes del Sistema SIRCA-RAG

| Componente | Descripción |
|:---:|:---|
| **C1** | Pipeline RAG biomédico especializado |
| **C2** | Memoria vectorial persistente |
| **C3** | Agente semi-autónomo con retrieval híbrido |
| **C4** | Adquisición científica automatizada |
| **C5** | Interfaz de generación contextualizada |

## Stack Tecnológico

- **Lenguaje:** Python 3.10+
- **Frameworks RAG:** LangChain, LlamaIndex
- **Embeddings:** BioBERT, PubMedBERT, Sentence Transformers
- **Vectores:** FAISS, ChromaDB
- **NLP:** SciSpaCy, spaCy
- **LLMs:** Llama 3, Mistral 7B, Qwen 2.5
- **Backend:** FastAPI, PostgreSQL, Redis, Docker

## Referencias

El archivo `references.bib` contiene **42+ referencias reales** de fuentes académicas verificables (IEEE, ACM, Springer, Elsevier, Nature, PubMed, arXiv).

## Notas

- Las figuras en `figures/` deben ser generadas o reemplazadas con diagramas de alta resolución antes de la publicación final.
- Las métricas experimentales son preliminares y plausibles; deben actualizarse con resultados de implementación real.
- Todas las secciones mantienen coherencia terminológica y conceptual respecto a SIRCA-RAG.

## Licencia

Este proyecto es de uso académico. Todos los derechos reservados por los autores.
