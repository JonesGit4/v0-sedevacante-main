"use client"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

const languages = [
  { code: "en", name: "EN", flag: "🇺🇸" },
  { code: "pt", name: "PT", flag: "🇧🇷" },
  { code: "fr", name: "FR", flag: "🇫🇷" },
  { code: "es", name: "ES", flag: "🇪🇸" },
]

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]
  const otherLanguages = languages.filter((lang) => lang.code !== language)

  const handleLanguageSelect = (code: string) => {
    setLanguage(code as any)
    setIsOpen(false)
  }

  return (
    <div className="fixed right-8 bottom-20 z-50 hidden lg:flex flex-col gap-2">
      {/* Current selected language - always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 bg-red-900 text-white border-2 border-gold-500"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <span className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {/* Other languages - shown when expanded */}
      {isOpen && (
        <div className="flex flex-col gap-2">
          {otherLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="px-3 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 bg-red-950 text-gray-300 border-2 border-red-800 hover:bg-red-900"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
