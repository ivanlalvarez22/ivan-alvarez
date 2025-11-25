export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    const allowedProtocols = ["http:", "https:", "mailto:"]
    return allowedProtocols.includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

export function sanitizeUrl(url: string): string | null {
  if (!isValidUrl(url)) {
    return null
  }
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.toString()
  } catch {
    return null
  }
}

export function isExternalUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url, "https://example.com")
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
  } catch {
    return false
  }
}
