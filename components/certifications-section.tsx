"use client"

import Image from "next/image"
import Link from "next/link"
import { lazy, Suspense, useMemo } from "react"

const Award = lazy(() => import("lucide-react").then(mod => ({ default: mod.Award })))

interface CertificationsSectionProps {
  onCertClick: (cert: { image: string; title: string; issuer: string; url?: string }) => void
}

export default function CertificationsSection({ onCertClick }: CertificationsSectionProps) {
  const certs = useMemo(() => [
    {
      image: "https://storage.hackviser.com/file/hackviser-prod/certificates/34e3f9f92a1d4cada6e28177a6eb79ba.webp",
      title: "Certified Associate Penetration Tester",
      issuer: "CAPT — Hackviser",
      gradient: "from-primary to-secondary",
      url: "https://storage.hackviser.com/file/hackviser-prod/certificates/34e3f9f92a1d4cada6e28177a6eb79ba.webp",
    },
    {
      image: "/certificates/cehpc.png",
      title: "Ethical Hacking Professional Certification",
      issuer: "CEHPC™ — Certiprof",
      gradient: "from-secondary to-accent",
      url: "https://www.credly.com/badges/8d63a8cf-0d22-47a1-90d6-583eb31fcfe0",
    },
    {
      image: "/certificates/pmj.png",
      title: "Pentester Mentor Junior",
      issuer: "PMJ — Hacker Mentor",
      gradient: "from-accent to-primary",
      url: "https://app.kajabi.com/certificates/877dc7dc",
    },
  ], [])

  return (
    <section id="certifications" className="mb-20 sm:mb-32 lg:mb-40">
      <div className="flex items-center gap-3 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight gradient-text">Certificaciones</h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-accent via-primary to-transparent rounded-full" />
      </div>

      <div className="grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2">
        {certs.map((cert, index) => (
          <div
            key={index}
            className="group relative p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-lg shadow-black/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover-lift animate-on-scroll overflow-hidden"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="space-y-4 sm:space-y-6">
              <div 
                className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-background rounded-2xl border border-border/50 shadow-md shadow-black/5 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => onCertClick({ image: cert.image, title: cert.title, issuer: cert.issuer, url: cert.url })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    onCertClick({ image: cert.image, title: cert.title, issuer: cert.issuer, url: cert.url })
                  }
                }}
                aria-label={`Ver certificación ${cert.title} en tamaño completo`}
              >
                <Image
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-6"
                  quality={55}
                  loading="lazy"
                  decoding="async"
                  unoptimized={cert.image?.startsWith("http")}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/8 via-gray-600/5 to-gray-700/8 rounded-2xl" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold group-hover:gradient-text transition-all duration-300">
                  {cert.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-semibold">{cert.issuer}</p>
              </div>
              <Link
                href={cert.url || cert.image}
                target="_blank"
                rel="noopener noreferrer"
                title="Ver certificación"
                className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r ${cert.gradient} text-primary-foreground rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer`}
              >
                <Suspense fallback={<div className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}>
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </Suspense>
                Certificado
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

