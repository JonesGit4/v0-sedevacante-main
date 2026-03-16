"use client"

import { useState, useEffect, useCallback, type FormEvent } from "react"
import type { Metadata } from "next"

/* ═══════════════════════ TYPES ═══════════════════════ */
interface ScheduleEvent {
  time: string
  title: string
  celebrant?: string
  type: "mass" | "activity" | "meal" | "devotion"
}
interface DaySchedule {
  day: string
  date: string
  liturgicalName: string
  color: string
  noAccommodation?: boolean
  events: ScheduleEvent[]
}

/* ═══════════════════════ DATA ═══════════════════════ */
const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#programacao", label: "Programação" },
  { href: "#local", label: "Local" },
  { href: "#inscricao", label: "Inscrição" },
  { href: "#hospedagem", label: "Hospedagem" },
  { href: "#valores", label: "Valores" },
]

const slideImages = [
  { src: "/images/semana-santa/foto-01.jpg", alt: "Altar decorado com flores e velas" },
  { src: "/images/semana-santa/hero-bispo-incenso.jpg", alt: "Bispo Dom Rodrigo com incensário" },
  { src: "/images/semana-santa/hero-bispo-mitra.jpg", alt: "Bispo Dom Rodrigo na celebração solene" },
]

const schedule: DaySchedule[] = [
  {
    day: "Sábado", date: "28 de Março", liturgicalName: "Sábado — Chegada", color: "#9C8E7C", noAccommodation: true,
    events: [
      { time: "14:00", title: "Chegada e recepção", type: "activity" },
      { time: "16:00", title: "Confissões", type: "devotion" },
      { time: "18:00", title: "Santa Missa", celebrant: "Dom Rodrigo da Silva", type: "mass" },
      { time: "19:30", title: "Confraternização", type: "activity" },
    ],
  },
  {
    day: "Domingo", date: "29 de Março", liturgicalName: "Domingo de Ramos", color: "#DC2626", noAccommodation: true,
    events: [
      { time: "10:00", title: "Bênção dos Ramos e Santa Missa", celebrant: "Dom Rodrigo da Silva", type: "mass" },
      { time: "13:00", title: "Almoço", type: "meal" },
    ],
  },
  {
    day: "Segunda-feira", date: "30 de Março", liturgicalName: "Segunda-feira Santa", color: "#8B5CF6", noAccommodation: true,
    events: [
      { time: "19:00", title: "Santa Missa — rezada", celebrant: "Dom Rodrigo da Silva", type: "mass" },
    ],
  },
  {
    day: "Terça-feira", date: "31 de Março", liturgicalName: "Terça-feira Santa", color: "#8B5CF6", noAccommodation: true,
    events: [
      { time: "19:00", title: "Santa Missa — rezada", celebrant: "Dom Rodrigo da Silva", type: "mass" },
    ],
  },
  {
    day: "Quarta-feira", date: "1 de Abril", liturgicalName: "Quarta-feira Santa", color: "#8B5CF6",
    events: [
      { time: "19:00", title: "Santa Missa — rezada", celebrant: "Dom Rodrigo da Silva", type: "mass" },
      { time: "20:00", title: "Ofício de Trevas", type: "devotion" },
    ],
  },
  {
    day: "Quinta-feira", date: "2 de Abril", liturgicalName: "Quinta-feira Santa", color: "#EAB308",
    events: [
      { time: "10:00", title: "Missa \"In Coena Domini\" — Consagração dos Santos Óleos", celebrant: "Dom Rodrigo da Silva", type: "mass" },
      { time: "19:00", title: "Mandatum (Lava Pés)", type: "devotion" },
      { time: "20:00", title: "Ofício de Trevas", type: "devotion" },
    ],
  },
  {
    day: "Sexta-feira", date: "3 de Abril", liturgicalName: "Sexta-feira Santa", color: "#DC2626",
    events: [
      { time: "10:00", title: "Missa dos Pré-Santificados", celebrant: "Dom Rodrigo da Silva", type: "mass" },
      { time: "15:00", title: "Sermão e Via Sacra", celebrant: "Dom Rodrigo da Silva", type: "devotion" },
      { time: "20:00", title: "Ofício de Trevas", type: "devotion" },
    ],
  },
  {
    day: "Sábado", date: "4 de Abril", liturgicalName: "Sábado Santo", color: "#8B5CF6",
    events: [
      { time: "10:00", title: "Vigília Pascal", celebrant: "Dom Rodrigo da Silva", type: "mass" },
    ],
  },
  {
    day: "Domingo", date: "5 de Abril", liturgicalName: "Domingo de Páscoa", color: "#EAB308",
    events: [
      { time: "10:00", title: "Confirmação & Missa de Páscoa", celebrant: "Dom Rodrigo da Silva", type: "mass" },
      { time: "12:00", title: "Almoço festivo", type: "meal" },
    ],
  },
]

const typeIcons: Record<string, string> = { mass: "⛪", devotion: "🙏", meal: "🍞", activity: "📋" }
const typeColors: Record<string, string> = {
  mass: "border-l-gold bg-gold/5",
  devotion: "border-l-[#8B5CF6] bg-[#8B5CF6]/5",
  meal: "border-l-[#9C8E7C]/50 bg-[#9C8E7C]/5",
  activity: "border-l-[#9C8E7C]/30 bg-transparent",
}

/* ═══════════════════════ COMPONENTS ═══════════════════════ */

function SSNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0C0A09]/95 backdrop-blur-md border-b border-[#2E2821]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <a href="#" className="text-lg md:text-xl font-bold text-gold tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          ✝ Semana Santa 2026
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-[#9C8E7C] hover:text-gold transition-colors duration-200 tracking-wide uppercase">
              {link.label}
            </a>
          ))}
        </div>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gold p-2" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0C0A09]/98 backdrop-blur-md border-b border-[#2E2821] pb-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-sm text-[#9C8E7C] hover:text-gold hover:bg-[#1A1714] transition-colors uppercase tracking-wide">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % slideImages.length), [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {slideImages.map((img, idx) => (
        <div key={img.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: currentSlide === idx ? 1 : 0 }}>
          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09]/80 via-[#0C0A09]/70 to-[#0C0A09]/90" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.25) 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 opacity-0 animate-fade-in-up">
          <span className="text-gold text-4xl md:text-5xl leading-none">✝</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 opacity-0 animate-fade-in-up animate-delay-200 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="text-gold-gradient">Semana Santa</span><br />
          <span className="text-[#F5F0E8]">2026</span>
        </h1>
        <p className="text-xl md:text-2xl text-gold/80 mb-2 opacity-0 animate-fade-in-up animate-delay-400" style={{ fontFamily: "'Playfair Display', serif" }}>
          Com Dom Rodrigo da Silva
        </p>
        <div className="flex items-center justify-center gap-4 my-8 opacity-0 animate-fade-in-up animate-delay-400">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold/60 text-xs tracking-[0.3em] uppercase">Seminário São José — Bragança Paulista, SP</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
        <div className="mb-10 opacity-0 animate-fade-in-up animate-delay-600">
          <div className="inline-flex items-center gap-3 bg-[#1A1714]/80 border border-[#2E2821] rounded-full px-6 py-3 backdrop-blur-sm">
            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span className="text-[#F5F0E8] text-sm md:text-base font-medium">29 de Março a 5 de Abril de 2026</span>
          </div>
        </div>
        <div className="opacity-0 animate-fade-in-up animate-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#hospedagem" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-[#0C0A09] font-semibold px-8 py-4 rounded-lg text-base md:text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:-translate-y-0.5">
            Preciso de Hospedagem
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a href="#inscricao" className="inline-flex items-center gap-2 bg-transparent border border-gold/60 hover:border-gold text-gold font-semibold px-8 py-4 rounded-lg text-base md:text-lg transition-all duration-300 hover:bg-gold/10 hover:-translate-y-0.5">
            Doações — Ajude a Cerimônia
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slideImages.map((_, idx) => (
          <button key={idx} type="button" onClick={() => setCurrentSlide(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-gold w-6" : "bg-gold/30 hover:bg-gold/50"}`} aria-label={`Slide ${idx + 1}`} />
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-gold/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="sobre" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.4) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-gold text-2xl">✝</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Informações <span className="text-gold-gradient">Gerais</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 via-gold/10 to-transparent rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
              <div className="relative bg-[#1A1714] border border-[#2E2821] rounded-2xl overflow-hidden max-w-sm">
                <img src="/images/semana-santa/dom-rodrigo-cruz.jpg" alt="Dom Rodrigo da Silva" className="w-full h-auto object-cover" />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>Dom Rodrigo da Silva</h3>
                  <p className="text-sm text-[#9C8E7C] mt-1">Bispo celebrante</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-[#D4C5B0] leading-relaxed text-base md:text-lg">
              Venha vivenciar os mistérios da Paixão, Morte e Ressurreição de Nosso Senhor Jesus Cristo durante a <strong className="text-[#F5F0E8]">Semana Santa de 2026</strong>, em um período de intensa espiritualidade com todas as cerimônias litúrgicas tradicionais.
            </p>
            <p className="text-[#D4C5B0] leading-relaxed text-base md:text-lg">
              As cerimônias serão celebradas por <strong className="text-gold">Dom Rodrigo da Silva</strong>, no <strong className="text-[#F5F0E8]">Seminário São José</strong>, em Bragança Paulista, interior de São Paulo.
            </p>
            <p className="text-[#D4C5B0] leading-relaxed text-base md:text-lg">
              A programação começa no Sábado dia 28, Domingo de Ramos (29 de março) e segue até o Domingo de Páscoa (5 de abril), com missas, confissões, Via Sacra, meditações e os ritos do Tríduo Pascal.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: "📅", label: "Período", value: "28 de Março a 5 de Abril" },
                { icon: "⛪", label: "Local", value: "Seminário São José" },
                { icon: "📍", label: "Cidade", value: "Bragança Paulista-SP" },
                { icon: "✝", label: "Celebrante", value: "Bispo Dom Rodrigo da Silva" },
              ].map((item) => (
                <div key={item.label} className="bg-[#1A1714] border border-[#2E2821] rounded-xl p-4">
                  <div className="text-gold text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm text-[#9C8E7C]">{item.label}</div>
                  <div className="text-[#F5F0E8] font-medium text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section id="programacao" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.4) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-gold text-2xl">✝</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gold-gradient">Programação</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-4" />
          <p className="text-[#9C8E7C] text-sm italic">[Programação sujeita a alterações]</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {schedule.map((day, idx) => (
            <button key={`${day.day}-${day.date}`} type="button" onClick={() => setActiveDay(idx)}
              className={`px-3 md:px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border relative ${
                activeDay === idx
                  ? "bg-gold/10 border-gold text-gold shadow-[0_0_15px_rgba(201,168,76,0.15)]"
                  : "bg-[#1A1714] border-[#2E2821] text-[#9C8E7C] hover:border-gold/30 hover:text-[#D4C5B0]"
              }`}
            >
              <div className="font-semibold">{day.liturgicalName.length > 16 ? day.day : day.liturgicalName}</div>
              <div className="text-xs opacity-70">{day.date}</div>
              {day.noAccommodation && (
                <div className="absolute -top-2 -right-2 bg-[#9C8E7C] text-[#0C0A09] text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-tight">*</div>
              )}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#F5F0E8]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {schedule[activeDay].liturgicalName}
            </h3>
            <p className="text-gold/70 text-sm mt-1">{schedule[activeDay].day}, {schedule[activeDay].date}</p>
            {schedule[activeDay].noAccommodation && (
              <p className="text-[#9C8E7C] text-xs mt-2 bg-[#1A1714] border border-[#2E2821] inline-block px-3 py-1 rounded-full">
                * Sem hospedagem — apenas celebrações
              </p>
            )}
          </div>

          <div className="space-y-3">
            {schedule[activeDay].events.map((event, idx) => (
              <div key={`${schedule[activeDay].day}-${idx}`}
                className={`flex items-start gap-4 p-4 rounded-xl border-l-4 border border-[#2E2821]/50 ${typeColors[event.type]} transition-all duration-200 hover:bg-[#1A1714]`}
              >
                <div className="text-center min-w-[60px]">
                  <span className="text-gold font-mono text-sm font-semibold">{event.time}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{typeIcons[event.type]}</span>
                    <span className={`font-medium ${event.type === "mass" ? "text-gold" : "text-[#F5F0E8]"}`}>{event.title}</span>
                  </div>
                  {event.celebrant && <p className="text-xs text-gold/60 mt-1 ml-7 italic">Celebrante: {event.celebrant}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-[#9C8E7C] text-xs">* Dias sem hospedagem — apenas celebrações no Seminário São José</p>
        </div>
      </div>
    </section>
  )
}

function LocationSection() {
  return (
    <section id="local" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.4) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-gold text-2xl">✝</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gold-gradient">Local</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl overflow-hidden">
              <img src="/images/semana-santa/local-01.jpg" alt="Celebração na capela do Seminário São José" className="w-full h-auto object-cover aspect-[3/2]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl overflow-hidden">
                <img src="/images/semana-santa/local-02.jpg" alt="Ipê amarelo no Seminário São José" className="w-full h-48 object-cover" />
              </div>
              <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl overflow-hidden">
                <img src="/images/semana-santa/local-03.jpg" alt="Religiosos em oração na capela" className="w-full h-48 object-cover" />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#F5F0E8] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                <a href="https://maps.app.goo.gl/Czz21SHkJFkUErqt7" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-200">
                  Seminário São José ↗
                </a>
              </h3>
              <p className="text-[#D4C5B0] leading-relaxed text-base md:text-lg">
                As celebrações ocorrerão no{" "}
                <a href="https://maps.app.goo.gl/Czz21SHkJFkUErqt7" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light font-semibold underline underline-offset-2 decoration-gold/40 hover:decoration-gold transition-all duration-200">
                  Seminário São José
                </a>{" "}
                em Bragança Paulista, interior de São Paulo, um ambiente agradável, acolhedor e de contemplação.
              </p>
            </div>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-gold text-xl">📍</span>
                <div>
                  <h4 className="text-gold font-semibold mb-1">
                    <a href="https://maps.app.goo.gl/Czz21SHkJFkUErqt7" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Seminário São José ↗
                    </a>
                  </h4>
                  <p className="text-[#D4C5B0] text-sm leading-relaxed">
                    Bragança Paulista, SP — Interior de São Paulo. Um ambiente dedicado à formação religiosa e à vida contemplativa, ideal para a vivência da Semana Santa.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl overflow-hidden">
              <img src="/images/semana-santa/seminario-map.jpg" alt="Mapa - Seminário São José, Bragança Paulista" className="w-full h-auto" />
              <div className="p-3 text-center">
                <p className="text-[#9C8E7C] text-xs">Localização do Seminário São José — Bragança Paulista, SP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AccommodationSection() {
  return (
    <section id="hospedagem" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.4) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-gold text-2xl">✝</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gold-gradient">Hospedagem</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-4" />
          <p className="text-[#9C8E7C] max-w-lg mx-auto text-sm">
            A hospedagem será em uma chácara próxima ao Seminário São José, com toda a infraestrutura necessária para o seu conforto.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto mb-12">
          {[
            { icon: "🚿", title: "2 Banheiros", subtitle: "Completos" },
            { icon: "🏊", title: "Piscina", subtitle: "Área de lazer" },
            { icon: "🌳", title: "Jardim", subtitle: "Área verde ampla" },
            { icon: "👩", title: "12 Feminino", subtitle: "Vagas" },
            { icon: "👨", title: "12 Masculino", subtitle: "Vagas" },
            { icon: "🅿️", title: "Estacionamento", subtitle: "No local" },
          ].map((item) => (
            <div key={item.title} className="bg-[#1A1714] border border-[#2E2821] rounded-xl p-4 hover:border-gold/20 transition-colors text-center">
              <span className="text-2xl">{item.icon}</span>
              <div className="mt-2">
                <div className="text-[#F5F0E8] font-medium text-sm">{item.title}</div>
                <div className="text-[#9C8E7C] text-xs">{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl overflow-hidden">
            <img src="/images/semana-santa/hospedagem-01.jpg" alt="Vista panorâmica da chácara" className="w-full h-64 object-cover" />
          </div>
          <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl overflow-hidden">
            <img src="/images/semana-santa/hospedagem-02.jpg" alt="Casa da chácara com jardim" className="w-full h-64 object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ValoresSection() {
  return (
    <section id="valores" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.4) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-gold text-2xl">✝</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gold-gradient">Valores</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-4" />
          <p className="text-[#9C8E7C] max-w-lg mx-auto text-sm">
            Escolha a opção que melhor atende às suas necessidades. As vagas são limitadas a 24 pessoas (12 masculinas e 12 femininas).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Com Alimentação */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-gold/40 to-gold/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#1A1714] border-2 border-gold/30 rounded-2xl p-8 h-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gold text-[#0C0A09] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Recomendado</span>
              </div>
              <div className="text-center mb-6 pt-2">
                <h3 className="text-xl font-bold text-gold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Com Alimentação</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[#9C8E7C] text-sm">R$</span>
                  <span className="text-5xl font-bold text-[#F5F0E8]" style={{ fontFamily: "'Playfair Display', serif" }}>600</span>
                  <span className="text-[#9C8E7C] text-sm">,00</span>
                </div>
                <p className="text-[#9C8E7C] text-xs mt-1">por pessoa / 4 noites (01 a 05/Abr)</p>
              </div>
              <div className="h-px bg-[#2E2821] mb-6" />
              <ul className="space-y-3 mb-8">
                {["Hospedagem por 4 noites (01 a 05/Abr)", "Café da manhã, almoço e jantar", "Todas as cerimônias litúrgicas", "Palestras e meditações", "Acesso à piscina e áreas comuns", "Confissões com Dom Rodrigo"].map((f) => (
                  <li key={f} className="flex items-start gap-3"><span className="mt-0.5 text-sm text-green-400">✓</span><span className="text-[#D4C5B0] text-sm">{f}</span></li>
                ))}
              </ul>
              <a href="#inscricao" className="block w-full text-center bg-gold hover:bg-gold-light text-[#0C0A09] font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                Escolher este plano
              </a>
            </div>
          </div>

          {/* Sem Alimentação */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#2E2821]/40 to-transparent rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#1A1714] border border-[#2E2821] rounded-2xl p-8 h-full">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#D4C5B0] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Sem Alimentação</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[#9C8E7C] text-sm">R$</span>
                  <span className="text-5xl font-bold text-[#F5F0E8]" style={{ fontFamily: "'Playfair Display', serif" }}>500</span>
                  <span className="text-[#9C8E7C] text-sm">,00</span>
                </div>
                <p className="text-[#9C8E7C] text-xs mt-1">por pessoa / 4 noites (01 a 05/Abr)</p>
              </div>
              <div className="h-px bg-[#2E2821] mb-6" />
              <ul className="space-y-3 mb-8">
                {["Hospedagem por 4 noites (01 a 05/Abr)", "Todas as cerimônias litúrgicas", "Palestras e meditações", "Acesso à piscina e áreas comuns", "Confissões com Dom Rodrigo"].map((f) => (
                  <li key={f} className="flex items-start gap-3"><span className="mt-0.5 text-sm text-green-400">✓</span><span className="text-[#D4C5B0] text-sm">{f}</span></li>
                ))}
                <li className="flex items-start gap-3"><span className="mt-0.5 text-sm text-red-400/70">✗</span><span className="text-[#9C8E7C] text-sm line-through">Alimentação não incluída</span></li>
              </ul>
              <a href="#inscricao" className="block w-full text-center bg-[#231F1A] hover:bg-[#2E2821] text-[#D4C5B0] font-semibold py-3 rounded-lg border border-[#2E2821] transition-all duration-300">
                Escolher este plano
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-[#9C8E7C] text-sm">💳 Pagamento via <strong className="text-gold">PIX</strong> — QR Code gerado automaticamente após a inscrição</p>
        </div>
      </div>
    </section>
  )
}

function RegistrationSection() {
  type Step = "form" | "loading" | "done" | "error"
  const [step, setStep] = useState<Step>("form")
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    gender: "" as "M" | "F" | "",
    accommodationType: "" as "com_alimentacao" | "sem_alimentacao" | "",
    numberOfPeople: 1, notes: "",
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.gender) return
    setStep("loading")
    try {
      const res = await fetch("https://webn8n.duobro.com.br/webhook/semana-santa-2026", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "registration",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          accommodationType: formData.accommodationType,
          numberOfPeople: formData.numberOfPeople,
          notes: formData.notes,
          totalAmount: (formData.accommodationType === "com_alimentacao" ? 600 : 500) * formData.numberOfPeople,
        }),
      })
      if (!res.ok) throw new Error("Erro")
      setStep("done")
    } catch {
      setStep("error")
    }
  }

  return (
    <section id="inscricao" className="py-12 md:py-16 relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.5) 0%, transparent 60%)" }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="text-gold text-2xl">✝</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gold-gradient">Inscrição</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-4" />
          <p className="text-[#9C8E7C] max-w-2xl mx-auto text-sm">Preencha o formulário abaixo para garantir sua vaga, caso queira dividir hospedagem com outros fiéis e clique no{" "}
            <a href="https://chat.whatsapp.com/GYMvtKHyyREDlnOIdsapOq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-medium">
              Grupo do WhatsApp
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-[#25D366]"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            </a>
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {step === "form" && (
            <form onSubmit={handleSubmit} className="bg-[#1A1714] border border-[#2E2821] rounded-2xl p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#D4C5B0] mb-1.5">Nome completo *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0C0A09] border border-[#2E2821] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-[#9C8E7C]/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="Seu nome completo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#D4C5B0] mb-1.5">E-mail *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0C0A09] border border-[#2E2821] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-[#9C8E7C]/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#D4C5B0] mb-1.5">Telefone (WhatsApp) *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0C0A09] border border-[#2E2821] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-[#9C8E7C]/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#D4C5B0] mb-1.5">Sexo *</label>
                <div className="grid grid-cols-2 gap-3">
                  {(["M", "F"] as const).map((g) => (
                    <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${formData.gender === g ? "bg-gold/10 border-gold text-gold" : "bg-[#0C0A09] border-[#2E2821] text-[#9C8E7C] hover:border-gold/30"}`}>
                      {g === "M" ? "Masculino" : "Feminino"}
                    </button>
                  ))}
                </div>
              </div>
              {/* Tipo de hospedagem — oculto temporariamente */}
              <div>
                <label className="block text-sm font-medium text-[#D4C5B0] mb-1.5">Número de pessoas</label>
                <select value={formData.numberOfPeople} onChange={(e) => setFormData({ ...formData, numberOfPeople: Number(e.target.value) })}
                  className="w-full bg-[#0C0A09] border border-[#2E2821] rounded-lg px-4 py-3 text-[#F5F0E8] focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors">
                  {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "pessoa" : "pessoas"}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#D4C5B0] mb-1.5">Observações</label>
                <textarea rows={3} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#0C0A09] border border-[#2E2821] rounded-lg px-4 py-3 text-[#F5F0E8] placeholder-[#9C8E7C]/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors resize-none"
                  placeholder="Restrições alimentares, necessidades especiais, etc." />
              </div>
              {/* Total — oculto temporariamente */}
              <button type="submit" className="w-full bg-gold hover:bg-gold-light text-[#0C0A09] font-bold py-4 rounded-lg text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,168,76,0.3)]">
                Confirmar Inscrição
              </button>
            </form>
          )}

          {step === "loading" && (
            <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full mx-auto mb-4" />
              <p className="text-[#D4C5B0]">Processando sua inscrição...</p>
            </div>
          )}

          {step === "done" && (
            <div className="bg-[#1A1714] border border-[#2E2821] rounded-2xl p-6 md:p-8 text-center">
              <div className="text-green-400 text-4xl mb-3">✓</div>
              <h3 className="text-2xl font-bold text-[#F5F0E8] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{formData.name} Confirmado!</h3>
              <p className="text-[#D4C5B0] mb-6">
                Enviamos as instruções e maiores detalhes via e-mail e WhatsApp em breve.
              </p>
              <button type="button" onClick={() => { setStep("form"); setFormData({ name: "", email: "", phone: "", gender: "", accommodationType: "", numberOfPeople: 1, notes: "" }) }}
                className="bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 font-semibold px-8 py-3 rounded-lg transition-all">
                Fazer nova inscrição
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="bg-[#1A1714] border border-red-500/20 rounded-2xl p-8 text-center">
              <div className="text-red-400 text-4xl mb-3">✗</div>
              <h3 className="text-xl font-bold text-[#F5F0E8] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Erro ao processar</h3>
              <p className="text-[#D4C5B0] mb-6">Ocorreu um erro ao processar sua inscrição. Tente novamente ou entre em contato.</p>
              <button type="button" onClick={() => setStep("form")} className="bg-gold hover:bg-gold-light text-[#0C0A09] font-semibold px-8 py-3 rounded-lg transition-all">
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SSFooter() {
  return (
    <footer className="py-12 border-t border-[#2E2821]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4">
          <span className="text-gold text-xl">✝</span>
          <h3 className="text-lg font-bold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>Semana Santa 2026</h3>
          <p className="text-[#9C8E7C] text-sm max-w-md mx-auto">
            Seminário São José<br />Bragança Paulista — SP
          </p>
          <div className="flex items-center justify-center gap-4 text-[#9C8E7C] text-xs">
            <span>29 de Março a 5 de Abril de 2026</span>
            <span className="text-gold/30">•</span>
            <span>Bispo Dom Rodrigo da Silva</span>
          </div>
          <div className="h-px bg-[#2E2821] max-w-xs mx-auto my-6" />
          <div className="text-[#9C8E7C]/60 text-xs space-y-1">
            <p><a href="https://sedevacante.com.br" className="hover:text-gold transition-colors">sedevacante.com.br</a></p>
            <p>© 2026 Sedevacante. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════ PAGE ═══════════════════════ */
export default function SemanaSanta2026Page() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#F5F0E8]">
      <SSNavbar />
      <HeroSection />
      <AboutSection />
      <ScheduleSection />
      <LocationSection />
      <RegistrationSection />
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-sm bg-[#0C0A09]/40 z-20 rounded-lg pointer-events-none" style={{ filter: "blur(0px)" }} />
        <div style={{ filter: "blur(6px)", opacity: 0.6, pointerEvents: "none" }}>
          <AccommodationSection />
          <ValoresSection />
        </div>
      </div>
      <SSFooter />
    </div>
  )
}
