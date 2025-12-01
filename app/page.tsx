"use client"

import { useEffect, useCallback, useState, lazy, Suspense, useRef } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Copy, Check } from "lucide-react"

import BackgroundBlobs from "@/components/background-blobs"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import WorkSection from "@/components/work-section"
import ProjectsSection from "@/components/projects-section"
import CertificationsSection from "@/components/certifications-section"
import ContactSection from "@/components/contact-section"
import LoadingScreen from "@/components/loading-screen"

const CertificationModal = lazy(() => import("@/components/certification-modal"))

export default function Home() {
  const [selectedCert, setSelectedCert] = useState<{ image: string; title: string; issuer: string; url?: string } | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isMobile = useIsMobile()
  
  const handleCertClick = useCallback((cert: { image: string; title: string; issuer: string; url?: string }) => {
    setSelectedCert(cert)
    setIsZoomed(false)
  }, [])

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("ivanlalvarez.22@gmail.com")
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    setIsMounted(true)
    requestAnimationFrame(() => {
      document.documentElement.classList.add("js-enabled")
    })
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    let timers: NodeJS.Timeout[] = []

    const ensureElementsVisible = () => {
      const isMobileDevice = window.innerWidth < 768 || isMobile
      
      if (isMobileDevice) {
        const timer = setTimeout(() => {
          const elements = document.querySelectorAll(".animate-on-scroll:not(.visible)")
          elements.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.classList.add("visible")
            }
          })
        }, 300)
        timers.push(timer)
      }
    }

    ensureElementsVisible()
    
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", ensureElementsVisible)
    } else {
      ensureElementsVisible()
    }
    
    window.addEventListener("load", ensureElementsVisible)
    
    return () => {
      timers.forEach(timer => clearTimeout(timer))
      document.removeEventListener("DOMContentLoaded", ensureElementsVisible)
      window.removeEventListener("load", ensureElementsVisible)
    }
  }, [isMobile])

  useEffect(() => {
    if (typeof window === "undefined") return

    if (isMobile || window.innerWidth < 768) {
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll(".animate-on-scroll")
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.classList.add("visible")
          }
        })
      }, 100)
      return () => clearTimeout(timer)
    }

    if (!isMounted) return

    let mounted = true
    let timeoutId: NodeJS.Timeout | null = null

    const initObserver = () => {
      if (!mounted) return

      if (!("IntersectionObserver" in window)) {
        requestAnimationFrame(() => {
          const elements = document.querySelectorAll(".animate-on-scroll")
          elements.forEach((el) => {
            if (el instanceof HTMLElement) {
              el.classList.add("visible")
            }
          })
        })
        return
      }

      requestAnimationFrame(() => {
        if (!mounted) return

        const elements = document.querySelectorAll(".animate-on-scroll:not(.visible)")
        if (elements.length === 0) return

        observerRef.current = new IntersectionObserver(
          (entries) => {
            const toUpdate: HTMLElement[] = []
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.target instanceof HTMLElement) {
                toUpdate.push(entry.target)
              }
            })

            if (toUpdate.length > 0) {
              requestAnimationFrame(() => {
                toUpdate.forEach((el) => {
                  if (mounted && el.isConnected) {
                    el.classList.add("visible")
                    observerRef.current?.unobserve(el)
                  }
                })
              })
            }
          },
          { threshold: 0.05, rootMargin: "100px" },
        )

        elements.forEach((el) => {
          if (el.isConnected && observerRef.current) {
            observerRef.current.observe(el)
          }
        })

        timeoutId = setTimeout(() => {
          if (mounted && observerRef.current) {
            const unobserved = document.querySelectorAll(".animate-on-scroll:not(.visible)")
            unobserved.forEach((el) => {
              if (el.isConnected && el instanceof HTMLElement) {
                el.classList.add("visible")
                observerRef.current?.unobserve(el)
              }
            })
          }
        }, 2000)
      })
    }

    setTimeout(initObserver, 100)

    return () => {
      mounted = false
      if (timeoutId) clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isMounted, isMobile])

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <BackgroundBlobs />

        <Navigation />

        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-16 sm:pb-24">
          <HeroSection />

          <WorkSection />

          <ProjectsSection />

          <CertificationsSection onCertClick={handleCertClick} />

          {selectedCert && (
            <Suspense fallback={<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" />}>
              <CertificationModal 
                cert={selectedCert}
                onClose={() => {
                setSelectedCert(null)
                setIsZoomed(false)
                }}
              />
            </Suspense>
          )}

          <ContactSection />

          <footer className="pt-8 sm:pt-10 lg:pt-12 border-t border-border/50 animate-on-scroll">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="font-medium text-center md:text-left">© 2025 Ivan Alvarez. Todos los derechos reservados.</div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group cursor-pointer"
                aria-label="Copiar email"
              >
                <span className="gradient-text">{emailCopied ? "¡Copiado!" : "ivanlalvarez.22@gmail.com"}</span>
                {emailCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}
