"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface CertificationModalProps {
  cert: {
    image: string
    title: string
    issuer: string
    url?: string
  } | null
  onClose: () => void
}

export default function CertificationModal({ cert, onClose }: CertificationModalProps) {
  if (!cert) return null

  return (
    <Dialog open={!!cert} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="p-1 overflow-hidden flex flex-col"
        style={{
          maxWidth: "92vw",
          width: "92vw", 
          height: "92vh",
          maxHeight: "92vh",
        }}
      >
        <DialogHeader className="px-3 mb-1 flex-shrink-0 py-1">
          <DialogTitle className="text-base sm:text-lg font-bold">
            {cert.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground font-semibold mt-0.5 sr-only">
            Certificación emitida por {cert.issuer}
          </DialogDescription>
          <p className="text-xs text-muted-foreground font-semibold mt-0.5">
            {cert.issuer}
          </p>
        </DialogHeader>

        <div 
          className="relative w-full flex-1 min-h-0 bg-gradient-to-br from-muted to-background rounded-lg overflow-auto border border-border"
        >
          <div className="w-full h-full min-h-[400px] flex items-center justify-center p-3 sm:p-4">
            <Image
              src={cert.image}
              alt={cert.title}
              width={3000}
              height={2000}
              className="w-full h-auto max-w-full max-h-[calc(92vh-120px)] object-contain select-none"
              unoptimized={cert.image.startsWith("http")}
              quality={90}
              draggable={false}
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="px-2 mt-1 flex-shrink-0 py-1">
          <a
            href={cert.url || cert.image}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-xs font-semibold"
          >
            Abrir en nueva pestaña
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

