import { NextResponse } from "next/server"
import { profile } from "@/lib/data"

export const revalidate = 3600

type LangMap = Record<string, number>

export async function GET() {
  const user = profile.githubUser
  const headers: HeadersInit = { Accept: "application/vnd.github+json", "User-Agent": "portfolio" }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ])

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "github_unavailable" }, { status: 502 })
    }

    const userData = await userRes.json()
    const repos: Array<{ stargazers_count: number; language: string | null; fork: boolean }> =
      await reposRes.json()

    let totalStars = 0
    const langCount: LangMap = {}
    for (const repo of repos) {
      totalStars += repo.stargazers_count || 0
      if (repo.language) langCount[repo.language] = (langCount[repo.language] || 0) + 1
    }

    const total = Object.values(langCount).reduce((a, b) => a + b, 0) || 1
    const topLanguages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, percent: Math.round((count / total) * 100) }))

    return NextResponse.json({
      login: userData.login,
      name: userData.name,
      avatar_url: userData.avatar_url,
      public_repos: userData.public_repos,
      public_gists: userData.public_gists,
      followers: userData.followers,
      following: userData.following,
      created_at: userData.created_at,
      html_url: userData.html_url,
      totalStars,
      topLanguages,
    })
  } catch {
    return NextResponse.json({ error: "github_unavailable" }, { status: 502 })
  }
}
