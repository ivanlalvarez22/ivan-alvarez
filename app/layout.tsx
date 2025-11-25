import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: "Ivan Alvarez - Software Developer & Security Engineer",
    template: "%s | Ivan Alvarez",
  },
  description:
    "Ingeniero Python especializado en sistemas de web scraping a gran escala, cybersecurity y extracción de datos. Experto en pipelines ETL, reverse engineering e infraestructura cloud.",
  keywords: [
    "Python Developer",
    "Security Engineer",
    "Web Scraping",
    "Cybersecurity",
    "Penetration Testing",
    "Data Engineering",
    "ETL Pipelines",
    "BigQuery",
    "GCP",
    "Reverse Engineering",
    "CAPT",
    "CEHPC",
  ],
  authors: [{ name: "Ivan Alvarez" }],
  creator: "Ivan Alvarez",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://ivanlalvarez.dev",
    title: "Ivan Alvarez - Software Developer & Security Engineer",
    description:
      "Ingeniero Python especializado en sistemas de web scraping a gran escala, cybersecurity y extracción de datos.",
    siteName: "Portfolio Ivan Alvarez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivan Alvarez - Software Developer & Security Engineer",
    description:
      "Ingeniero Python especializado en sistemas de web scraping a gran escala, cybersecurity y extracción de datos.",
    creator: "@ivanlalvarez22",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: undefined,
  },
  icons: {
    icon: "/profile-hq.jpeg",
    apple: "/profile-hq.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
