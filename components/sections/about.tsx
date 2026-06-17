"use client"

import { Brain, Rocket, Users, Wrench } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"

const icons = [Rocket, Users, Wrench, Brain]

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={t.about.label} title={t.about.title} />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="space-y-5 text-pretty leading-relaxed text-muted-foreground">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {t.about.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  {pill}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.about.traits.map((trait, i) => {
              const Icon = icons[i]
              return (
                <Reveal key={trait.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">{trait.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{trait.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
