"use client"

import { useEffect, useCallback, useState, lazy, Suspense, useRef } from "react"
import { Copy, Check } from "lucide-react"

const BackgroundBlobs = lazy(() => import("@/components/background-blobs"))
const Navigation = lazy(() => import("@/components/navigation"))
const HeroSection = lazy(() => import("@/components/hero-section"))
const CertificationModal = lazy(() => import("@/components/certification-modal"))
const WorkSection = lazy(() => import("@/components/work-section"))
const ProjectsSection = lazy(() => import("@/components/projects-section"))
const CertificationsSection = lazy(() => import("@/components/certifications-section"))
const ContactSection = lazy(() => import("@/components/contact-section"))

export default function Home() {
  const [selectedCert, setSelectedCert] = useState<{ image: string; title: string; issuer: string; url?: string } | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  
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

  useEffect(() => {
    setIsMounted(true)
    document.documentElement.classList.add("js-enabled")
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return

    let mounted = true
    let timeoutId: NodeJS.Timeout | null = null

    const initObserver = () => {
      if (!mounted) return

      if (!("IntersectionObserver" in window)) {
        const elements = document.querySelectorAll(".animate-on-scroll")
        elements.forEach((el) => el.classList.add("visible"))
        return
      }

      requestAnimationFrame(() => {
        if (!mounted) return

        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.target instanceof HTMLElement && mounted) {
                requestAnimationFrame(() => {
                  if (mounted && entry.target.isConnected) {
                    entry.target.classList.add("visible")
                    if (observerRef.current && entry.target.isConnected) {
                      try {
                        observerRef.current.unobserve(entry.target)
                      } catch (e) {
                        // Element may have been removed
                      }
                    }
                  }
                })
              }
            })
          },
          { threshold: 0.05, rootMargin: "20px" },
        )

        const elements = document.querySelectorAll(".animate-on-scroll:not(.visible)")
        elements.forEach((el) => {
          if (el.isConnected && observerRef.current) {
            try {
              observerRef.current.observe(el)
            } catch (e) {
              // Element may have been removed
            }
          }
        })

        timeoutId = setTimeout(() => {
          if (mounted && observerRef.current) {
            const unobserved = document.querySelectorAll(".animate-on-scroll:not(.visible)")
            unobserved.forEach((el) => {
              if (el.isConnected) {
                el.classList.add("visible")
                try {
                  observerRef.current?.unobserve(el)
                } catch (e) {
                  // Element may have been removed
                }
              }
            })
          }
        }, 2000)
      })
    }

    const scheduleWork = (callback: () => void) => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(callback, { timeout: 1000 })
      } else {
        setTimeout(callback, 300)
      }
    }

    scheduleWork(initObserver)

    return () => {
      mounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (observerRef.current) {
        try {
          observerRef.current.disconnect()
        } catch (e) {
          // Ignore errors during cleanup
        }
        observerRef.current = null
      }
    }
  }, [isMounted])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Suspense fallback={null}>
        <BackgroundBlobs />
      </Suspense>

      <Suspense fallback={<nav className="fixed top-0 left-0 right-0 z-50 h-16" />}>
        <Navigation />
      </Suspense>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <Suspense fallback={<div className="mb-20 sm:mb-32 lg:mb-40 h-96" />}>
          <HeroSection />
        </Suspense>

        {/* Work Experience */}
        <Suspense fallback={<div className="mb-20 sm:mb-32 lg:mb-40 h-96" />}>
          <WorkSection />
        </Suspense>

        {/* Projects */}
        <Suspense fallback={<div className="mb-20 sm:mb-32 lg:mb-40 h-96" />}>
          <ProjectsSection />
        </Suspense>

        {/* Certifications */}
        <Suspense fallback={<div className="mb-20 sm:mb-32 lg:mb-40 h-96" />}>
          <CertificationsSection onCertClick={handleCertClick} />
        </Suspense>

        {/* Certification Modal */}
        {selectedCert && (
          <Suspense fallback={null}>
            <CertificationModal 
              cert={selectedCert}
              onClose={() => {
              setSelectedCert(null)
              setIsZoomed(false)
              }}
            />
          </Suspense>
        )}

        {/* Contact */}
        <Suspense fallback={<div className="mb-12 sm:mb-16 h-96" />}>
          <ContactSection />
        </Suspense>

        {/* Footer */}
        <footer className="pt-8 sm:pt-10 lg:pt-12 border-t border-border/50 animate-on-scroll">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="font-medium text-center md:text-left">© 2025 Ivan Alvarez. Todos los derechos reservados.</div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
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
  )
}
