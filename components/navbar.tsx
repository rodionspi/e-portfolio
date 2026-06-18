"use client"

import { useEffect, useState } from "react"
import { Download, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n/provider"
import { profile } from "@/lib/data"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#education", label: t.nav.education },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#github", label: t.nav.github },
    { href: "#contact", label: t.nav.contact },
    { href: "https://sites.google.com/view/rodions/start", label: t.nav.modules },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 bg-white transition-all duration-300",
          scrolled ? "border-border shadow-sm" : "border-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2 pl-1 font-heading text-sm font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            RS
          </span>
          <span className="hidden sm:inline">Rodion Spiridonov</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={t.protectedFiles.cv.label}
            download={"Lebenslauf.pdf"}
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:flex"
          >
            <Download className="h-3.5 w-3.5" />
            {t.nav.resume}
          </a>
          <button
            type="button"
            aria-label={t.nav.menu}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white absolute top-20 z-40 w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-border p-3 lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={t.protectedFiles.cv.label}
                download={"Lebenslauf.pdf"}
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                <Download className="h-4 w-4" />
                {t.nav.resume}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
