"use client"

import { useEffect, useState, lazy, Suspense } from "react"

const ShieldCheck = lazy(() => import("lucide-react").then(mod => ({ default: mod.ShieldCheck })))
const Database = lazy(() => import("lucide-react").then(mod => ({ default: mod.Database })))
const Code2 = lazy(() => import("lucide-react").then(mod => ({ default: mod.Code2 })))

interface LoadingScreenProps {
  onComplete: () => void
}

const messages = [
  { text: "Comprobando seguridad...", icon: "shield", duration: 300 },
  { text: "Conectando bases de datos...", icon: "database", duration: 350 },
  { text: "Compilando código...", icon: "code", duration: 300 },
  { text: "Listo", icon: "all", duration: 200 },
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [activeIcon, setActiveIcon] = useState<string>("shield")

  useEffect(() => {
    setActiveIcon(messages[0].icon)
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (isComplete) return

    const currentMessage = messages[currentMessageIndex]
    let charIndex = 0
    let mounted = true

    const typingInterval = setInterval(() => {
      if (!mounted) return

      if (charIndex < currentMessage.text.length) {
        setDisplayedText(currentMessage.text.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)

        setTimeout(() => {
          if (!mounted) return

          if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex((prev) => {
              const nextIndex = prev + 1
              setActiveIcon(messages[nextIndex].icon)
              return nextIndex
            })
            setDisplayedText("")
            setIsTyping(true)
          } else {
            setIsComplete(true)
            setTimeout(() => {
              if (mounted) {
                onComplete()
              }
            }, 150)
          }
        }, currentMessage.duration)
      }
    }, 40)

    return () => {
      mounted = false
      clearInterval(typingInterval)
    }
  }, [currentMessageIndex, isComplete, onComplete])

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
        {activeIcon === "all" ? (
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 mb-4 animate-fade-in-up">
            <div className="flex flex-col items-center gap-2 animate-fade-in-up">
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20 hover:scale-110 transition-transform duration-300">
                <Suspense fallback={<div className="w-8 h-8 sm:w-10 sm:h-10" />}>
                  <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                </Suspense>
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center">Ciberseguridad</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-secondary to-secondary/60 shadow-lg shadow-secondary/20 hover:scale-110 transition-transform duration-300">
                <Suspense fallback={<div className="w-8 h-8 sm:w-10 sm:h-10" />}>
                  <Database className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-foreground" />
                </Suspense>
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center">Ing. de Datos</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-accent to-accent/60 shadow-lg shadow-accent/20 hover:scale-110 transition-transform duration-300">
                <Suspense fallback={<div className="w-8 h-8 sm:w-10 sm:h-10" />}>
                  <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-accent-foreground" />
                </Suspense>
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center">Desarrollo</span>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br transition-all duration-500 ${
              activeIcon === "shield" 
                ? "from-primary to-primary/60 shadow-lg shadow-primary/20" 
                : activeIcon === "database"
                ? "from-secondary to-secondary/60 shadow-lg shadow-secondary/20"
                : "from-accent to-accent/60 shadow-lg shadow-accent/20"
            }`}>
              <Suspense fallback={<div className="w-10 h-10 sm:w-12 sm:h-12" />}>
                {activeIcon === "shield" && (
                  <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground md:pulse-glow" />
                )}
                {activeIcon === "database" && (
                  <Database className="w-10 h-10 sm:w-12 sm:h-12 text-secondary-foreground md:pulse-glow" />
                )}
                {activeIcon === "code" && (
                  <Code2 className="w-10 h-10 sm:w-12 sm:h-12 text-accent-foreground md:pulse-glow" />
                )}
              </Suspense>
            </div>
          </div>
        )}

        <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-center px-4">
          <span className="gradient-text">
            {displayedText}
            {showCursor && !isComplete && (
              <span className="inline-block w-0.5 h-[1em] bg-primary ml-1 animate-pulse" />
            )}
          </span>
        </div>

        <div className="w-48 sm:w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
            style={{
              width: `${((currentMessageIndex + 1) / messages.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

