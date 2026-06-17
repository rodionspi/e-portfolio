import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }))
  const expectedPassword = process.env.PRIVATE_ACCESS_PASSWORD ?? "portfolio-private-2026"

  if (password === expectedPassword) {
    const response = NextResponse.json({ ok: true })

    response.cookies.set({
      name: "protected_access",
      value: "true",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    })

    return response
  }

  return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 })
}
