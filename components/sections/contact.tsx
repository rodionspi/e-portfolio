"use client"

import { Mail, Briefcase, Code2, Send, ArrowUpRight } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"
import { profile } from "@/lib/data"

export function Contact() {
  const { t } = useI18n()

  const links = [
    { label: t.contact.linkedin, value: "rodion-spiridonov", href: profile.linkedin, Icon: Briefcase },
    { label: t.contact.github, value: profile.githubUser, href: profile.github, Icon: Code2 },
  ]

  return (
    <section id="contact" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={t.contact.label} title={t.contact.title} subtitle={t.contact.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map(({ label, value, href, Icon }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
