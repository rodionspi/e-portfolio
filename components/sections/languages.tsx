"use client"

import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n/provider"
import { languageLevels } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"

export function Languages() {
  const { t } = useI18n()

  return (
    <section id="languages" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading label={t.languages.label} title={t.languages.title} />

        <div className="space-y-6">
          {languageLevels.map((lang, i) => {
            const isNative = lang.level === 100
            return (
              <Reveal key={lang.key} delay={i * 0.06}>
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="font-medium">
                      {t.languages.items[lang.key as keyof typeof t.languages.items]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {isNative ? t.languages.native : lang.label}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    />
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
