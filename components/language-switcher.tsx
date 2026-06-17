"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { localeMeta, locales, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
      >
        <span aria-hidden>{localeMeta[locale].flag}</span>
        <span>{localeMeta[locale].label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="glass absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border p-1 shadow-lg"
        >
          {locales.map((l: Locale) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => {
                  setLocale(l)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                  l === locale && "bg-accent font-medium text-accent-foreground",
                )}
              >
                <span aria-hidden>{localeMeta[l].flag}</span>
                <span>{localeMeta[l].name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
