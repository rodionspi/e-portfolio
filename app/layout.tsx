import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rodion Spiridonov — Software Developer | IT Apprenticeship',
  description:
    'Portfolio of Rodion Spiridonov, a fast-learning software developer from Basel, Switzerland, seeking an IT apprenticeship. Web development, AI applications and modern software engineering.',
  keywords: [
    'Rodion Spiridonov',
    'Software Developer',
    'IT Lehrstelle',
    'Apprenticeship',
    'Basel',
    'Switzerland',
    'Web Developer',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'Rodion Spiridonov' }],
  openGraph: {
    title: 'Rodion Spiridonov — Software Developer',
    description:
      'Fast-learning software developer from Basel seeking an IT apprenticeship. Web development, AI applications and modern software engineering.',
    type: 'website',
    locale: 'de_CH',
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
