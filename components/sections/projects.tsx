"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Check, Code2, Star } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { projectsMeta } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"

export function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={t.projects.label} title={t.projects.title} subtitle={t.projects.subtitle} />

        <div className="grid gap-6 md:grid-cols-2">
          {projectsMeta.map((meta, i) => {
            const p = t.projects.items[meta.id as keyof typeof t.projects.items]
            if (!p) return null
            return (
              <motion.article
                key={meta.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-primary/40"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                    <Star className="h-3 w-3" />
                    {p.highlight}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {meta.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3 border-t border-border pt-5">
                  {meta.github && (
                    <a
                      href={meta.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      {t.projects.code}
                    </a>
                  )}
                  {meta.website && (
                    <a
                      href={meta.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      {t.projects.live}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
