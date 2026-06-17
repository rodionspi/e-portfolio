"use client"

import { Award, Code2, Cpu, Sigma, Trophy } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"

const icons = [Sigma, Cpu, Trophy, Code2, Award]

export function Achievements() {
  const { t } = useI18n()

  return (
    <section id="achievements" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={t.achievements.label} title={t.achievements.title} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.achievements.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium leading-snug">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
