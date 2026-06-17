import { promises as fs } from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"

const PRIVATE_ROOT = path.resolve(process.cwd(), "private")

function isSafeRelativePath(fileName: string) {
  const normalized = path.normalize(fileName).replace(/^(\.\.(\/|\\|$))+/g, "")
  return Boolean(normalized) && !normalized.startsWith("..") && !path.isAbsolute(normalized)
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const cookie = request.cookies.get("protected_access")

  if (cookie?.value !== "true") {
    return NextResponse.json({ error: "Access denied" }, { status: 403 })
  }

  const { file } = await params
  const decodedFileName = decodeURIComponent(file)

  if (!isSafeRelativePath(decodedFileName)) {
    return NextResponse.json({ error: "Invalid file name" }, { status: 400 })
  }

  const filePath = path.resolve(PRIVATE_ROOT, decodedFileName)

  if (!filePath.startsWith(PRIVATE_ROOT)) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 })
  }

  try {
    const content = await fs.readFile(filePath)
    const extension = path.extname(filePath).toLowerCase()
    const contentType = {
      ".txt": "text/plain; charset=utf-8",
      ".pdf": "application/pdf",
      ".json": "application/json",
      ".md": "text/markdown; charset=utf-8",
    }[extension] ?? "application/octet-stream"

    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}
