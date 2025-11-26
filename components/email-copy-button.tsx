"use client"

import { useCallback, useState } from "react"
import { Check, Copy } from "lucide-react"

export default function EmailCopyButton() {
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("ivanlalvarez.22@gmail.com")
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }, [])

  return (
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
  )
}


