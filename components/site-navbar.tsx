"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export function SiteNavbar() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"
  const isAdmin = pathname.startsWith("/admin")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  if (isAdmin) return null

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")
    if (href?.startsWith("/#")) {
      if (isHome) {
        e.preventDefault()
        const el = document.querySelector(href.replace("/", ""))
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }
      setMobileMenuOpen(false)
    } else if (href?.startsWith("#")) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { href: isHome ? "#home" : "/", label: t.navHome },
    { href: isHome ? "#updates" : "/#updates", label: t.navUpdates },
    { href: isHome ? "#articles" : "/#articles", label: t.navArticles },
    { href: isHome ? "#communities" : "/#communities", label: t.navCommunities },
    { href: isHome ? "#videos" : "/#videos", label: t.navVideos },
    { href: isHome ? "#downloadables" : "/#downloadables", label: t.navDownloadables },
    { href: "/store", label: t.navStore, bold: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isHome
            ? "bg-black/90 backdrop-blur-md shadow-lg py-3"
            : "bg-[#5C0A1A] backdrop-blur-md shadow-lg py-3"
          : isHome
            ? "bg-transparent py-5"
            : "bg-[#5C0A1A] py-5"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/sedevacante-logo.png"
            alt="Sedevacante Logo"
            width={120}
            height={40}
            className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-11"}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex gap-7 text-white/80 font-serif text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className={`hover:text-accent transition-colors uppercase tracking-widest ${
                    link.bold ? "font-bold text-accent" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-black/95 border-t border-accent/20">
          <ul className="flex flex-col font-serif text-sm px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className={`hover:text-accent transition-colors uppercase tracking-widest block py-3 border-b border-white/5 ${
                    link.bold ? "font-bold text-accent" : "text-white/80"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
