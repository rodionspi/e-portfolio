"use client"

import { useEffect, useState, type FormEvent } from "react"
import { ArrowUpRight, FileText, Lock, Mail, Send, Unlock } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { Reveal } from "../motion"
import { SectionHeading } from "../section-heading"
import { profile } from "@/lib/data"

const ACCESS_COOKIE = "protected_access"

function hasAccessCookie() {
  if (typeof document === "undefined") {
    return false
  }

  return document.cookie.split("; ").some((cookie) => cookie.startsWith(`${ACCESS_COOKIE}=`))
}

export function ProtectedFiles() {
  const { t } = useI18n()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    setIsUnlocked(hasAccessCookie())
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const response = await fetch("/api/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })

    const result = await response.json().catch(() => null)

    if (response.ok && result?.ok) {
      setIsUnlocked(true)
      setPassword("")
      setError("")
      setLoading(false)
      return
    }

    setError(result?.error ?? t.protectedFiles.errors.generic)
    setLoading(false)
  };

    const links = [
        { label: t.contact.email, value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
        { label: t.contact.telegram, value: profile.telegramHandle, href: profile.telegram, Icon: Send },
        { label: t.protectedFiles.cv.label, value: t.protectedFiles.cv.value, href: "", Icon: FileText, download: true }
    ]

  return (
    <section className="mx-auto max-w-5xl px-4 pb-20">
      <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm font-medium text-muted-foreground">
              <Lock className="h-4 w-4" />
              {t.protectedFiles.badge}
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{t.protectedFiles.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t.protectedFiles.description}
            </p>
          </div>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-background/70 p-4 sm:flex-row">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t.protectedFiles.placeholder}
              className="h-11 flex-1 rounded-full border border-border bg-transparent px-4 text-sm outline-none ring-0"
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? t.protectedFiles.checking : t.protectedFiles.submit}
              {loading ? null : <Unlock className="h-4 w-4" />}
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-border bg-background/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <Unlock className="h-4 w-4" />
              {t.protectedFiles.success}
            </div>
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-4 sm:grid-cols-2">
                {links.map(({ label, value, href, Icon, download }, i) => (
                    <Reveal key={label} delay={i * 0.06}>
                    <a
                        href={href}
                        target={download || href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        download={download ? "Lebenslauf.pdf" : undefined}
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
          </div>
        )}

        {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
      </div>
    </section>
  )
}
