"use client"

import { useEffect, useCallback, useState, lazy, Suspense, useRef, memo } from "react"

const Copy = lazy(() => import("lucide-react").then(mod => ({ default: mod.Copy })))
const Check = lazy(() => import("lucide-react").then(mod => ({ default: mod.Check })))

const BackgroundBlobs = lazy(() => import("@/components/background-blobs"))
const Navigation = lazy(() => import("@/components/navigation"))
const HeroSection = lazy(() => import("@/components/hero-section"))
const CertificationModal = lazy(() => import("@/components/certification-modal"))
const WorkSection = lazy(() => import("@/components/work-section"))
const ProjectsSection = lazy(() => import("@/components/projects-section"))
const CertificationsSection = lazy(() => import("@/components/certifications-section"))
const ContactSection = lazy(() => import("@/components/contact-section"))
const LoadingScreen = lazy(() => import("@/components/loading-screen"))

export default function Home() {
  const [selectedCert, setSelectedCert] = useState<{ image: string; title: string; issuer: string; url?: string } | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsMounted(true)
    requestAnimationFrame(() => {
      document.documentElement.classList.add("js-enabled")
    })
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return

    let mounted = true
    let timeoutId: NodeJS.Timeout | null = null

    const initObserver = () => {
      if (!mounted) return

      if (!("IntersectionObserver" in window)) {
        requestAnimationFrame(() => {
          const elements = document.querySelectorAll(".animate-on-scroll")
          elements.forEach((el) => el.classList.add("visible"))
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
              if (el.isConnected) {
                el.classList.add("visible")
                observerRef.current?.unobserve(el)
              }
            })
          }
        }, 2000)
      })
    }

    setTimeout(initObserver, 200)

    return () => {
      mounted = false
      if (timeoutId) clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [isMounted])

  return (
    <>
      {isLoading && (
        <Suspense fallback={null}>
          <LoadingScreen onComplete={handleLoadingComplete} />
        </Suspense>
      )}

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

        <Suspense fallback={<div className="mb-20 sm:mb-32 lg:mb-40 h-96" />}>
          <WorkSection />
        </Suspense>

        <Suspense fallback={<div className="mb-20 sm:mb-32 lg:mb-40 h-96" />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<div className="mb-20 sm:mb-32 lg:mb-40 h-96" />}>
          <CertificationsSection onCertClick={handleCertClick} />
        </Suspense>

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

        <Suspense fallback={<div className="mb-12 sm:mb-16 h-96" />}>
          <ContactSection />
        </Suspense>

        <footer className="pt-8 sm:pt-10 lg:pt-12 border-t border-border/50 animate-on-scroll">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="font-medium text-center md:text-left">© 2025 Ivan Alvarez. Todos los derechos reservados.</div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group cursor-pointer"
              aria-label="Copiar email"
            >
              <span className="gradient-text">{emailCopied ? "¡Copiado!" : "ivanlalvarez.22@gmail.com"}</span>
              <Suspense fallback={null}>
                {emailCopied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                )}
              </Suspense>
            </button>
          </div>
        </footer>
      </main>
    </div>
    </>
  )
}
