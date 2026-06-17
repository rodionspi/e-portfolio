"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/provider"
import { skillGroups } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"

export function Skills() {
  const { t } = useI18n()

  const groups = [
    { key: "expert" as const, label: t.skills.expert, skills: skillGroups.expert, accent: "bg-primary" },
    { key: "advanced" as const, label: t.skills.advanced, skills: skillGroups.advanced, accent: "bg-chart-2" },
    { key: "intermediate" as const, label: t.skills.intermediate, skills: skillGroups.intermediate, accent: "bg-chart-3" },
  ]

  return (
    <section id="skills" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={t.skills.label} title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((group, gi) => (
            <Reveal key={group.key} delay={gi * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-card/60 p-6">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${group.accent}`} aria-hidden />
                  <h3 className="text-sm font-semibold uppercase tracking-wide">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: si * 0.04 }}
                      className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
