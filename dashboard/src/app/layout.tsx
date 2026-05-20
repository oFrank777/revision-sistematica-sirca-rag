import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "SIRCA-RAG | Ecosistema de Revisión Científica",
  description: "Dashboard interactivo para la revisión sistemática de literatura sobre SIRCA-RAG y tecnologías afines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased font-sans bg-academic-light-bg dark:bg-academic-dark-bg text-academic-light-text dark:text-academic-dark-text min-h-screen">
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen ml-64 transition-all duration-300 md:ml-64 max-md:ml-20">
              <Header />
              <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-900/10 dark:to-transparent -z-10 pointer-events-none" />
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
