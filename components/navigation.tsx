"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const NAVBAR_HEIGHT = 80 // Altura aproximada del navbar en px

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open")
    } else {
      document.body.classList.remove("menu-open")
    }
    return () => {
      document.body.classList.remove("menu-open")
    }
  }, [isMenuOpen])

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMenuOpen])

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setIsMenuOpen(false)
    
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - NAVBAR_HEIGHT
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-3 sm:py-5 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:scale-105 transition-transform"
            aria-label="Ir al inicio"
          >
            IA
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 sm:gap-6 lg:gap-8 text-xs sm:text-sm font-medium">
            <a
              href="#hero"
              className="text-muted-foreground hover:text-primary hover:scale-105 transition-all duration-300"
              onClick={(e) => handleNavClick("hero", e)}
            >
              Inicio
            </a>
            <a
              href="#work"
              className="text-muted-foreground hover:text-secondary hover:scale-105 transition-all duration-300"
              onClick={(e) => handleNavClick("work", e)}
            >
              Experiencia
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-primary hover:scale-105 transition-all duration-300"
              onClick={(e) => handleNavClick("projects", e)}
            >
              Proyectos
            </a>
            <a
              href="#certifications"
              className="text-muted-foreground hover:text-accent hover:scale-105 transition-all duration-300"
              onClick={(e) => handleNavClick("certifications", e)}
            >
              Certificaciones
            </a>
            <a
              href="#contact"
              className="px-3 sm:px-5 py-1.5 sm:py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 text-xs sm:text-sm"
              onClick={(e) => handleNavClick("contact", e)}
            >
              Contacto
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Simplified with CSS only */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[55] md:hidden bg-background/95 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 z-[60] md:hidden w-full max-w-sm h-full bg-background/95 backdrop-blur-xl border-l border-primary/20 shadow-2xl mobile-menu-slide flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-primary/10">
              <div className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Menú
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>

            <nav className="flex flex-col p-6 gap-3 flex-1 overflow-y-auto">
              <a
                href="#hero"
                onClick={(e) => handleNavClick("hero", e)}
                className="rounded-xl p-4 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <span className="font-medium text-base">Inicio</span>
              </a>
              <a
                href="#work"
                onClick={(e) => handleNavClick("work", e)}
                className="rounded-xl p-4 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <span className="font-medium text-base">Experiencia</span>
              </a>
              <a
                href="#projects"
                onClick={(e) => handleNavClick("projects", e)}
                className="rounded-xl p-4 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <span className="font-medium text-base">Proyectos</span>
              </a>
              <a
                href="#certifications"
                onClick={(e) => handleNavClick("certifications", e)}
                className="rounded-xl p-4 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                <span className="font-medium text-base">Certificaciones</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick("contact", e)}
                className="rounded-xl p-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-base text-center"
              >
                Contacto
              </a>
            </nav>

            {/* Footer del menú */}
            <div className="border-t border-primary/10 p-6 mt-auto">
              <div className="text-center space-y-2">
                <div className="text-sm font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Ivan Alvarez
                </div>
                <div className="text-xs text-muted-foreground">
                  Security Engineer
                </div>
                <div className="text-[10px] text-muted-foreground/70 mt-2">
                  © 2025 Todos los derechos reservados
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

