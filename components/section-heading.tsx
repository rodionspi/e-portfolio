"use client"

import { Reveal } from "@/components/motion"

export function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string
  title: string
  subtitle?: string
}) {
  return (
    <Reveal className="mb-12 flex flex-col items-center text-center">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
        {label}
      </span>
      <h2 className="max-w-2xl text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </Reveal>
  )
}
