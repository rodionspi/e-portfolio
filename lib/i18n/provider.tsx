"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { type Locale, defaultLocale, locales } from "./config"
import { en } from "./dictionaries/en"
import { de } from "./dictionaries/de"
import { fr } from "./dictionaries/fr"
import type { Dictionary } from "./dictionaries/en"

const dictionaries: Record<Locale, Dictionary> = { en, de, fr }

type I18nContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = "portfolio-locale"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored && locales.includes(stored)) {
      setLocaleState(stored)
      return
    }
    const browser = window.navigator.language.slice(0, 2) as Locale
    if (locales.includes(browser)) setLocaleState(browser)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    window.localStorage.setItem(STORAGE_KEY, l)
  }, [])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
