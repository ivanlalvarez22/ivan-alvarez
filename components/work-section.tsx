"use client"

import Image from "next/image"
import Link from "next/link"
import { lazy, Suspense, useMemo, useState } from "react"

const ArrowRight = lazy(() => import("lucide-react").then(mod => ({ default: mod.ArrowRight })))
const ChevronDown = lazy(() => import("lucide-react").then(mod => ({ default: mod.ChevronDown })))

export default function WorkSection() {
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set())
  
  const toggleJob = (index: number) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const jobs = useMemo(() => [
    {
      year: "Ago 2025 — Dic 2025",
      role: "Software Engineer",
      company: "SourceStack",
      logo: "/logos/sourcestack.jpeg",
      url: "https://sourcestack.co/",
      city: "San Francisco, California",
      country: "Estados Unidos",
      workType: "Remoto",
      gradient: "from-primary to-secondary",
      description:
        "Desarrollé código en Python para extraer datos de ofertas laborales públicas a partir de enlaces proporcionados. Agregué y limpié datos provenientes de múltiples sistemas ATS, garantizando la consistencia y calidad de la información procesada. Gestioné sitios dinámicos y aseguré una extracción de datos confiable y actualizada, aplicando buenas prácticas de ingeniería de software y técnicas avanzadas de web scraping para mantener la estabilidad de los pipelines de datos.",
    },
    {
      year: "Oct 2024 — Ago 2025",
      role: "Python Developer",
      company: "AutoScraping",
      logo: "/logos/autoscraping.jpeg",
      url: "https://autoscraping.com/",
      city: "Dover",
      country: "Estados Unidos",
      workType: "Remoto",
      gradient: "from-primary to-primary/60",
      description:
        "Lideré proyectos de web scraping de alta complejidad, desarrollando crawlers para extraer datos de sitios internacionales (noticias chinas, empresas de Arabia Saudita, e-commerce como Mercado Libre). Implementé técnicas avanzadas de seguridad mediante ingeniería inversa para bypass de captchas y rotación de proxies, asegurando acceso confiable a datos protegidos. Realicé auditorías de seguridad (pentesting web) a empresas locales para identificar y mitigar vulnerabilidades, analizando la seguridad de aplicaciones y sistemas para proteger datos sensibles y prevenir accesos no autorizados.",
    },
    {
      year: "Oct 2024 — May 2025",
      role: "Python Engineer",
      company: "Eclypsium, Inc.",
      logo: "/logos/eclypsium.jpeg",
      url: "http://eclypsium.com/",
      city: "Portland",
      country: "Estados Unidos",
      workType: "Remoto",
      gradient: "from-secondary to-secondary/60",
      description:
        "Desarrollé web scrapers robustos para extracción y monitoreo de boletines de seguridad, enfocados en identificar CVE (Common Vulnerabilities and Exposures) nuevos. Utilicé Python para procesos ETL, transformando y cargando datos críticos en BigQuery (GCP) para informar proactivamente a clientes sobre vulnerabilidades. Implementé procesos estrictos de calidad con pytest, pipelines CI/CD y técnicas de ingeniería inversa para bypasear sistemas antiscraping como Cloudflare y Akamai, utilizando las requests nativas del sitio para realizar scraping efectivo.",
    },
    {
      year: "Mar 2023 — Dic 2024",
      role: "Tech Lead & Full Stack Developer",
      company: "ITSE - Instituto Tecnológico de Santiago del Estero",
      logo: "/logos/logoitse2.png",
      url: "http://itse.gob.ar/",
      city: "Santiago del Estero",
      country: "Argentina",
      workType: "Presencial",
      gradient: "from-accent to-primary",
      description:
        "Desarrollé Dr. Turno, un sistema completo de gestión de turnos médicos para una clínica utilizando el stack MERN (MongoDB, Express, React, Node.js). Me encargué de todo el ciclo de desarrollo de software, desde el diseño hasta la implementación y despliegue. Lideré un equipo de 4 programadores como Tech Lead, coordinando tareas, code reviews y arquitectura del sistema. Este proyecto fue mi trabajo final de graduación como Desarrollador de Software.",
    },
    {
      year: "Dic 2016 — Oct 2024",
      role: "Profesor particular",
      company: "Universidad Nacional de Santiago del Estero",
      logo: "/logos/unse.jpeg",
      url: "https://www.unse.edu.ar/",
      city: "Santiago del Estero",
      country: "Argentina",
      workType: "Híbrido",
      gradient: "from-accent to-accent/60",
      description:
        "Brindé apoyo académico personalizado a estudiantes universitarios en materias de informática, matemáticas y ciencias exactas (programación en Python y Java, Estructuras de Datos, Álgebra, Física y Análisis Matemático I y II). Metodología centrada en resultados: Diseñé clases adaptadas a cada alumno, reforzando conceptos teóricos y prácticos. Desarrollo de habilidades: Fomenté el pensamiento lógico y la resolución de problemas, con resultados visibles en el rendimiento académico y la aprobación de materias de los estudiantes.",
    },
  ], [])

  return (
    <section id="work" className="mb-20 sm:mb-32 lg:mb-40">
      <div className="flex items-center gap-3 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight gradient-text">Experiencia</h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full" />
      </div>

      <div className="space-y-6 sm:space-y-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-lg shadow-black/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 ease-in-out hover-lift animate-on-scroll"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />

            <div className="relative flex flex-col md:flex-row gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <Link
                  href={job.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`Visitar sitio web de ${job.company}`}
                >
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br ${job.gradient} p-1 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer`}
                  >
                    <div className={`w-full h-full bg-white rounded-xl relative ${job.logo?.includes("logoitse2") ? "p-3 sm:p-4" : "p-2"}`}>
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={`Logo de ${job.company}`}
                        className="absolute inset-0 w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex-1 space-y-3 sm:space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 sm:gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 group-hover:gradient-text transition-all duration-500 ease-in-out">
                      {job.role}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground font-semibold">{job.company}</p>
                    {(job.city || job.country || job.workType) && (
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {(job.city || job.country) && (
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            📍 {[job.city, job.country].filter(Boolean).join(", ")}
                          </span>
                        )}
                        {job.workType && (
                          <span className="text-xs sm:text-sm text-primary font-medium">
                            {job.workType}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-muted/50 rounded-full text-xs sm:text-sm text-muted-foreground font-semibold">
                    {job.year}
                  </div>
                </div>
                <div>
                  <div className="md:block">
                    {expandedJobs.has(index) ? (
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed md:block line-clamp-3 md:line-clamp-none">
                          {job.description}
                        </p>
                        <button
                          onClick={() => toggleJob(index)}
                          className="md:hidden mt-2 flex items-center gap-1 text-primary font-semibold text-sm hover:opacity-80 transition-opacity"
                        >
                          <span>Ver más</span>
                          <Suspense fallback={<div className="w-4 h-4" />}>
                            <ChevronDown className="w-4 h-4" />
                          </Suspense>
                        </button>
                      </>
                    )}
                  </div>
                  {expandedJobs.has(index) && (
                    <button
                      onClick={() => toggleJob(index)}
                      className="md:hidden mt-2 flex items-center gap-1 text-primary font-semibold text-sm hover:opacity-80 transition-opacity"
                    >
                      <span>Ver menos</span>
                      <Suspense fallback={<div className="w-4 h-4" />}>
                        <ChevronDown className="w-4 h-4 rotate-180" />
                      </Suspense>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

