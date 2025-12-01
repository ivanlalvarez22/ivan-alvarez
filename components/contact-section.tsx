"use client"

import Link from "next/link"
import { lazy, Suspense, useMemo } from "react"
import { isValidUrl, isExternalUrl } from "@/lib/validation"

const Github = lazy(() => import("lucide-react").then(mod => ({ default: mod.Github })))
const Linkedin = lazy(() => import("lucide-react").then(mod => ({ default: mod.Linkedin })))
const Twitter = lazy(() => import("lucide-react").then(mod => ({ default: mod.Twitter })))
const Mail = lazy(() => import("lucide-react").then(mod => ({ default: mod.Mail })))
const Rocket = lazy(() => import("lucide-react").then(mod => ({ default: mod.Rocket })))

export default function ContactSection() {
  const socials = useMemo(() => [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/ivanlalvarez22",
      color: "from-primary to-primary/60",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/ivanlalvarez22/",
      color: "from-secondary to-secondary/60",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/ivanlalvarez22",
      color: "from-accent to-accent/60",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:ivanlalvarez.22@gmail.com",
      color: "from-primary to-secondary",
    },
  ], [])

  return (
    <section id="contact" className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight gradient-text">Contacto</h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-primary via-secondary to-transparent rounded-full" />
      </div>

      <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-on-scroll">
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border border-primary/20">
          <div className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed max-w-2xl font-medium">
            Disponible para consultorías, colaboraciones o discusiones sobre proyectos de{" "}
            <span className="gradient-text font-bold">desarrollo de software</span>,{" "}
            <span className="gradient-text font-bold">web scraping</span> o trabajos nuevos en{" "}
            <span className="gradient-text font-bold">ciberseguridad</span>.{" "}
            <span className="inline-flex items-center gap-2">
              Construyamos algo grande juntos.
              <Suspense fallback={<span className="w-5 h-5 sm:w-6 sm:h-6 inline-block" />}>
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-primary inline-block" />
              </Suspense>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {socials.map((social, index) => {
            const Icon = social.icon
            return (
              <Link
                key={social.name}
                href={isValidUrl(social.url) ? social.url : "#"}
                target={isExternalUrl(social.url) ? "_blank" : undefined}
                rel={isExternalUrl(social.url) ? "noopener noreferrer" : undefined}
                className="group relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-border bg-card shadow-lg shadow-black/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover-lift animate-on-scroll overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="relative flex flex-col items-center gap-2 sm:gap-3 text-center">
                  <div className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${social.color}`}>
                    <Suspense fallback={<div className="w-5 h-5 sm:w-6 sm:h-6" />}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </Suspense>
                  </div>
                  <span className="text-xs sm:text-sm font-bold">{social.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

