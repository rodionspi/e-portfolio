"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useI18n } from "@/lib/i18n/provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      aria-label={t.nav.theme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 transition-colors hover:bg-accent"
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
