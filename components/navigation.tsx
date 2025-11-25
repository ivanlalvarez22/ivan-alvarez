"use client"

import Link from "next/link"

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-5 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform px-3 py-1.5 rounded-full border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          aria-label="Ir al inicio"
        >
          IA
        </a>
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 text-xs sm:text-sm font-medium">
          <a
            href="#hero"
            className="text-muted-foreground hover:text-primary hover:scale-105 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            Inicio
          </a>
          <a
            href="#work"
            className="text-muted-foreground hover:text-secondary hover:scale-105 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Experiencia
          </a>
          <a
            href="#projects"
            className="text-muted-foreground hover:text-primary hover:scale-105 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Proyectos
          </a>
          <a
            href="#certifications"
            className="text-muted-foreground hover:text-accent hover:scale-105 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Certificaciones
          </a>
          <a
            href="#contact"
            className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  )
}

