"use client"

import Image from "next/image"
import { Code2, Shield, Database, Sparkles } from "lucide-react"
import { useMemo, useEffect, useRef, useState } from "react"

export default function HeroSection() {
  const [typingText, setTypingText] = useState("")
  const [isRed, setIsRed] = useState(false)
  const isRedRef = useRef(false)
  const fullText = "Security Engineer"

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false
    let animationFrameId: number | null = null
    let mounted = true
    let lastUpdate = 0
    const TYPING_DELAY = 120
    const DELETING_DELAY = 60

    const type = (timestamp: number) => {
      if (!mounted) return

      const elapsed = timestamp - lastUpdate
      
      if (!isDeleting && currentIndex < fullText.length) {
        if (elapsed >= TYPING_DELAY) {
          setTypingText(fullText.slice(0, currentIndex + 1))
          currentIndex++
          lastUpdate = timestamp
        }
        animationFrameId = requestAnimationFrame(type)
      } else if (isDeleting && currentIndex > 0) {
        if (elapsed >= DELETING_DELAY) {
          setTypingText(fullText.slice(0, currentIndex - 1))
          currentIndex--
          lastUpdate = timestamp
        }
        animationFrameId = requestAnimationFrame(type)
      } else if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => {
          if (!mounted) return
          isRedRef.current = !isRedRef.current
          setIsRed(isRedRef.current)
          setTimeout(() => {
            if (!mounted) return
            isDeleting = true
            lastUpdate = performance.now()
            animationFrameId = requestAnimationFrame(type)
          }, 2000)
        }, 2000)
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false
        isRedRef.current = !isRedRef.current
        setIsRed(isRedRef.current)
        setTimeout(() => {
          if (!mounted) return
          lastUpdate = performance.now()
          animationFrameId = requestAnimationFrame(type)
        }, 500)
      }
    }

    const startTyping = () => {
      lastUpdate = performance.now()
      animationFrameId = requestAnimationFrame(type)
    }

    const timeoutId = setTimeout(startTyping, 1000)

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  const features = useMemo(() => [
    { icon: Shield, label: "Ciberseguridad", gradientClass: "from-primary to-primary/60" },
    { icon: Database, label: "Ingeniería de datos", gradientClass: "from-secondary to-secondary/60" },
    { icon: Code2, label: "Desarrollo de Software", gradientClass: "from-accent to-accent/60" },
  ], [])

  return (
    <section className="mb-20 sm:mb-32 lg:mb-40">
      <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
        <div className="flex-1 space-y-6 sm:space-y-8 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] pb-1 animate-on-scroll stagger-1 overflow-visible">
            <div className="text-lg sm:text-xl md:text-2xl font-medium mb-2 sm:mb-3">
              Soy <span className="gradient-text">Iván Alvarez</span>.
            </div>
            Software Developer &{" "}
            <span
              className={`inline-block ${isRed ? "text-red-500" : "gradient-text"}`}
              style={{ minWidth: "1ch" }}
            >
              {typingText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed animate-on-scroll stagger-2">
            Especialista en <span className="text-red-500 font-semibold">Pentesting</span> y{" "}
            <span className="text-primary font-semibold">Ciberseguridad</span>, con experiencia en{" "}
            <span className="text-accent font-semibold">Desarrollo de Software</span>.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4 animate-on-scroll stagger-3">
            {features.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 bg-card border border-border rounded-xl sm:rounded-2xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradientClass}`}>
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 animate-on-scroll stagger-2">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-2xl opacity-40 animate-spin-slow" />
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-60 pulse-glow" />
            <div className="relative">
              <Image
                src="/profile-hq.jpeg"
                alt="Iván Álvarez"
                width={280}
                height={280}
                className="relative rounded-full object-cover border-4 border-background shadow-2xl w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-3xl animate-on-scroll stagger-4">
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Desarrollador de software especializado en Python con más de 4 años de experiencia en web scraping, extracción de datos, seguridad informática y desarrollo backend. Ofrezco soluciones personalizadas que incluyen desarrollo de software a medida, sistemas de scraping, auditorías de seguridad y análisis de vulnerabilidades.
        </p>
      </div>
    </section>
  )
}

