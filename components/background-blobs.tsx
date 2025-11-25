"use client"

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl float-animation motion-reduce:animate-none" />
      <div
        className="absolute top-1/2 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-3xl float-animation motion-reduce:animate-none"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl float-animation motion-reduce:animate-none"
        style={{ animationDelay: "4s" }}
      />
    </div>
  )
}

