"use client"

import { useEffect, useState } from "react"
import { ShieldCheck, Database, Code2 } from "lucide-react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [activeIconIndex, setActiveIconIndex] = useState(0)

  const icons = [
    { icon: ShieldCheck, label: "Ciberseguridad", color: "primary" },
    { icon: Database, label: "Ing. de Datos", color: "secondary" },
    { icon: Code2, label: "Desarrollo", color: "accent" },
  ]

  useEffect(() => {
    if (isComplete) return

    const interval = setInterval(() => {
      setActiveIconIndex((prev) => (prev + 1) % icons.length)
    }, 500)

    return () => clearInterval(interval)
  }, [isComplete, icons.length])

  useEffect(() => {
    let mounted = true
    const duration = 2000
    const startTime = Date.now()

    const updateProgress = () => {
      if (!mounted) return

      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        setIsComplete(true)
        setTimeout(() => {
          if (mounted) {
            onComplete()
          }
        }, 300)
      } else {
        requestAnimationFrame(updateProgress)
      }
    }

    requestAnimationFrame(updateProgress)

    return () => {
      mounted = false
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl float-animation motion-reduce:animate-none" />
        <div
          className="absolute top-1/2 -right-48 w-96 h-96 bg-secondary/20 rounded-full blur-3xl float-animation motion-reduce:animate-none"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl float-animation motion-reduce:animate-none"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
        <div className="relative mb-4 flex items-center justify-center" style={{ minHeight: "120px", width: "200px" }}>
          {icons.map((item, index) => {
            const IconComponent = item.icon
            const isActive = index === activeIconIndex
            const colorClasses = {
              primary: "from-primary to-primary/60 shadow-primary/20 text-primary-foreground",
              secondary: "from-secondary to-secondary/60 shadow-secondary/20 text-secondary-foreground",
              accent: "from-accent to-accent/60 shadow-accent/20 text-accent-foreground",
            }[item.color]

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
                style={{
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${colorClasses} shadow-lg ${isActive ? "animate-pulse" : ""}`}>
                  <IconComponent
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    style={{ animation: isActive ? "spin 3s linear infinite" : "none" }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center">{item.label}</span>
              </div>
            )
          })}
        </div>

        <div className="w-48 sm:w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

