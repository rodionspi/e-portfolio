"use client"

import { Quote } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { Reveal } from "@/components/motion"

export function References() {
  const { t } = useI18n()

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 text-center sm:p-12">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Quote className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">{t.references.label}</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl">{t.references.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {t.references.desc}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
