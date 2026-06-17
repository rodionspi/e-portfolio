"use client"

import useSWR from "swr"
import { animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, BookMarked, FileCode2, GitFork, Star, Users } from "lucide-react"
import { useI18n } from "@/lib/i18n/provider"
import { profile } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/motion"

type GitHubData = {
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  totalStars: number
  html_url: string
  topLanguages: { name: string; percent: number }[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [value])

  return <span ref={ref}>{display}</span>
}

const langColors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]

export function GithubStats() {
  const { t } = useI18n()
  const { data, error, isLoading } = useSWR<GitHubData>("/api/github", fetcher, {
    revalidateOnFocus: false,
  })

  const stats = data && !data.hasOwnProperty("error")
    ? [
        { label: t.github.repos, value: data.public_repos, icon: BookMarked },
        { label: t.github.followers, value: data.followers, icon: Users },
        { label: t.github.stars, value: data.totalStars, icon: Star },
        { label: t.github.following, value: data.following, icon: GitFork },
        { label: t.github.gists, value: data.public_gists, icon: FileCode2 },
      ]
    : []

  return (
    <section id="github" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading label={t.github.label} title={t.github.title} subtitle={t.github.subtitle} />

        {isLoading && (
          <p className="text-center text-sm text-muted-foreground">{t.github.loading}</p>
        )}

        {(error || (data && (data as { error?: string }).error)) && (
          <p className="text-center text-sm text-muted-foreground">{t.github.error}</p>
        )}

        {data && !(data as { error?: string }).error && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-5">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <span className="mt-4 font-heading text-3xl font-semibold tracking-tight">
                      <Counter value={stat.value} />
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <Reveal>
                <div className="h-full rounded-2xl border border-border bg-card/60 p-6">
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide">
                    {t.github.topLanguages}
                  </h3>
                  <div className="space-y-4">
                    {data.topLanguages.map((lang, i) => (
                      <div key={lang.name}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-muted-foreground">{lang.percent}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className={`h-full rounded-full ${langColors[i % langColors.length]}`}
                            style={{ width: `${lang.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card/60 p-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {t.github.memberSince}
                    </p>
                    <p className="mt-1 font-heading text-2xl font-semibold">
                      {new Date(data.created_at).getFullYear()}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">@{profile.githubUser}</p>
                  </div>
                  <a
                    href={data.html_url || profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {t.github.viewProfile}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
