"use client"

import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { useMemo } from "react"
import Link from "next/link"

export default function ProjectsSection() {
  const projects = useMemo(() => [
    {
      name: "Dr. Turno - Sistema de Gestión de Turnos",
      description: "Sistema completo de gestión de turnos médicos para clínicas desarrollado con el stack MERN (MongoDB, Express, React, Node.js). Permite gestionar pacientes, turnos, profesionales médicos y generar reportes. Incluye funcionalidades de calendario, notificaciones y control de disponibilidad. Desarrollado como trabajo final de graduación en ITSE.",
      image: "/proyectos/drturno.png",
      url: "https://dr-turno.vercel.app/",
      gradient: "from-primary to-secondary",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Cloudinary", "Stripe", "Vercel"],
    },
    {
      name: "Inversión - Sistema de Gestión de Préstamos",
      description: "Sistema web completo desarrollado con Django para la gestión integral de préstamos de dinero, diseñado para administradores y cobradores. Permite gestionar préstamos, clientes, refinanciaciones y cronogramas de pago. Incluye dashboard con métricas en tiempo real, calculadora de presupuestos, sistema de roles y control de acceso. Desarrollado con PostgreSQL, Tailwind CSS, Docker y Cloudinary.",
      image: "/proyectos/inversion.png",
      url: "https://inversion.net.ar/",
      gradient: "from-secondary to-accent",
      technologies: ["Django", "PostgreSQL", "Tailwind CSS", "Docker", "Cloudinary", "Nginx"],
    },
  ], [])

  return (
    <section id="projects" className="mb-20 sm:mb-32 lg:mb-40">
      <div className="flex items-center gap-3 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight gradient-text">Proyectos</h2>
        <div className="flex-1 h-1 bg-gradient-to-r from-accent via-primary to-transparent rounded-full" />
      </div>

      <div className="grid gap-6 sm:gap-8 lg:gap-10 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card shadow-lg shadow-black/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover-lift animate-on-scroll overflow-hidden"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative space-y-4 sm:space-y-6">
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-background rounded-2xl border border-border/50 shadow-md group/image block"
              >
                <Image
                  src={`${project.image}?v=2`}
                  alt={`Screenshot de ${project.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <span>Visitar proyecto</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold transition-all duration-300">
                    {project.name.split(" - ").map((part, i) => 
                      i === 0 ? (
                        <span key={i} className="gradient-text">{part}</span>
                      ) : (
                        <span key={i}> - {part}</span>
                      )
                    )}
                  </h3>
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={`Visitar ${project.name}`}
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold bg-gradient-to-br from-card to-muted border border-border text-card-foreground rounded-lg hover:border-primary/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

