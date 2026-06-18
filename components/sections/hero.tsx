"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download, MapPin } from "lucide-react"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/provider"
import { profile } from "@/lib/data"
import { fadeUp, stagger } from "@/components/motion"

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="top" className="relative overflow-hidden px-4 pt-36 pb-20 sm:pt-44">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
          }}
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t.hero.badge}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance font-heading text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {t.hero.location}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {t.hero.viewProjects}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={t.protectedFiles.cv.label}
              download={"Lebenslauf.pdf"}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              {t.hero.downloadCv}
            </a>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div variants={fadeUp} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl" aria-hidden />
            <div className="relative h-60 w-60 overflow-hidden rounded-full border border-border bg-card/60 sm:h-72 sm:w-72">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="glass absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border px-4 py-1.5 text-sm font-medium">
              {profile.name}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
