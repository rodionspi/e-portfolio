"use client"

import { GraduationCap } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { educationYears } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"

export function Education() {
  const { t } = useI18n()

  return (
    <section id="education" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading label={t.education.label} title={t.education.title} />

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-1/2" aria-hidden />

          <ol className="space-y-8">
            {t.education.items.map((item, i) => (
              <Reveal key={item.school} delay={i * 0.06}>
                <li
                  className={`relative flex flex-col gap-3 pl-12 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"
                  }`}
                >
                  {/* node */}
                  <span
                    className={`absolute left-4 top-2 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background sm:left-auto ${
                      i % 2 === 0 ? "sm:-right-1.5 sm:left-auto" : "sm:-left-1.5"
                    }`}
                    aria-hidden
                  />
                  <div className="rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-primary">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {educationYears[i]}
                    </span>
                    <h3 className="mt-2 font-medium leading-snug">{item.school}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.place}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
