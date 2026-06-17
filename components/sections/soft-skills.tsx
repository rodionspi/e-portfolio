"use client"

import { Users, Compass, MessageSquare, GraduationCap, ClipboardList, Mic } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"

const icons = [Users, Compass, MessageSquare, GraduationCap, ClipboardList, Mic]

export function SoftSkills() {
  const { t } = useI18n()

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={t.soft.label} title={t.soft.title} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.soft.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
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
