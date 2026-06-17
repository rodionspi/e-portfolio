"use client"

import { useI18n } from "@/lib/i18n/provider"
import { profile } from "@/lib/data"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} · {t.footer.rights}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{t.footer.built}</p>
      </div>
    </footer>
  )
}
