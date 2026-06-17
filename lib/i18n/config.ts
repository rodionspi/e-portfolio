export const locales = ["de", "fr", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "de"

export const localeMeta: Record<Locale, { label: string; flag: string; name: string }> = {
  de: { label: "DE", flag: "🇩🇪", name: "Deutsch" },
  fr: { label: "FR", flag: "🇫🇷", name: "Français" },
  en: { label: "EN", flag: "🇬🇧", name: "English" },
}
