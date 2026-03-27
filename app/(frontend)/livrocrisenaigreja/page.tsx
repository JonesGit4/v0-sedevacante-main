"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import {
  BookOpen,
  FileText,
  Award,
  Globe,
  ChevronRight,
  Heart,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  X,
  Download,
  Mail,
  Quote,
} from "lucide-react"

/* --- TYPES --- */
type PurchaseStep = "form" | "processing" | "pix" | "done"
type DonationStep = "form" | "processing" | "pix" | "done"

/* --- SECTION: Navigation --- */
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "#sobre", label: "O Livro" },
    { href: "#amostra", label: "Amostra Grátis" },
    { href: "#autor", label: "O Autor" },
    { href: "#precos", label: "Preços" },
    { href: "#comprar", label: "Comprar" },
  ]
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C0A09]/90 backdrop-blur-md border-b border-[rgba(201,168,76,0.1)]">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="font-cinzel-decorative text-[#C9A84C] text-lg font-bold tracking-wide">
          Sedevacante
        </a>
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#D4C8B8] hover:text-[#C9A84C] transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#comprar"
            className="gold-glow px-5 py-2 rounded-lg text-sm font-bold"
          >
            Garanta o Seu
          </a>
        </div>
        {/* Mobile */}
        <button
          className="md:hidden text-[#C9A84C]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0C0A09]/95 backdrop-blur-md border-t border-[rgba(201,168,76,0.1)] px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-3 text-[#D4C8B8] hover:text-[#C9A84C] transition-colors text-sm font-medium border-b border-[rgba(201,168,76,0.06)]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#comprar"
            className="block mt-3 gold-glow px-5 py-3 rounded-lg text-sm font-bold text-center"
            onClick={() => setOpen(false)}
          >
            Garanta o Seu
          </a>
        </div>
      )}
    </nav>
  )
}

/* --- SECTION: Hero (with 3D perspective book) --- */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09] via-[#0C0A09] to-[#100E0C]" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_70%)]" />

      <div className="container relative mx-auto px-4 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
          {/* Book Perspective Image */}
          <div className="relative flex-shrink-0">
            {/* Golden glow behind book */}
            <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle,rgba(201,168,76,0.18)_0%,rgba(201,168,76,0.06)_40%,transparent_70%)] blur-3xl" />
            <img
              src="/images/livro/livro-perspec.png"
              alt="A Crise de Autoridade na Igreja - Capa do livro em perspectiva"
              className="livro-perspec relative w-[240px] sm:w-[300px] lg:w-[380px] drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
            />
            {/* Dynamic shadow under the book */}
            <div className="livro-perspec-shadow absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-8 rounded-[50%] blur-2xl bg-[rgba(201,168,76,0.15)]" />
          </div>

          {/* Text Content */}
          <div className="w-full max-w-xl text-center lg:max-w-2xl lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 shimmer px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              <Award size={14} />
              Lançamento Inédito
            </div>

            <h1 className="font-cinzel-decorative gold-text text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 tracking-wide uppercase text-center">
              <span className="block">A Crise</span>
              <span className="block">de Autoridade</span>
              <span className="block">na Igreja</span>
            </h1>

            <p className="font-serif text-[#D4C8B8] text-xl sm:text-2xl italic mb-6 leading-relaxed">
              Os papas do Vaticano II são legítimos?
            </p>

            <p className="text-[#8A8078] text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Uma obra fundamental de{" "}
              <span className="text-[#D4C8B8] font-medium">Maxence Hecquard</span>{" "}
              para compreender os debates teológicos mais importantes do nosso tempo. Mais de 400 páginas de análise profunda e argumentação rigorosa.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
              {[
                { icon: <BookOpen size={18} />, label: "400+ Páginas" },
                { icon: <FileText size={18} />, label: "8 Capítulos" },
                { icon: <Globe size={18} />, label: "Edição Brasileira" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-sm text-[#C9A84C]"
                >
                  {stat.icon}
                  <span className="font-medium">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-center lg:justify-start">
              <a
                href="#comprar"
                className="gold-glow w-full rounded-xl px-8 py-4 text-base font-bold inline-flex items-center justify-center gap-2 sm:w-auto"
              >
                Garanta seu Exemplar
                <ChevronRight size={18} />
              </a>
              <div className="text-sm text-[#8A8078]">
                <span className="text-[#C9A84C] font-bold text-lg">R$89,90</span>
                <span className="ml-1">no 1º Lote</span>
                <span className="block text-xs mt-0.5">25% de desconto · Unidades limitadas</span>
                <span className="block text-xs mt-0.5 text-green-500 font-semibold">Frete grátis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Sobre os Papas --- */
function AboutPapasSection() {
  return (
    <section id="sobre" className="livro-section-glow py-8 sm:py-10 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center md:text-left mb-8 sm:mb-10 lg:mb-14">
            <h2 className="font-cinzel-decorative gold-text text-3xl sm:text-4xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-wide uppercase">
              Os Papas do Vaticano II
            </h2>
            <p className="font-serif text-[#D4C8B8] text-xl sm:text-2xl lg:text-3xl italic leading-relaxed mt-2">
              são legítimos?
            </p>
            <div className="w-14 h-[3px] bg-[#C9A84C] mt-5 rounded-full mx-auto md:mx-0" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            <div className="space-y-4">
              <p className="text-[#B8AEA2] leading-[1.8] text-base">
                Esta obra examina uma das questões mais controversas e importantes da história recente da Igreja Católica: as implicações do Concílio Vaticano II e seus desdobramentos na estrutura hierárquica da Igreja.
              </p>
              <p className="text-[#B8AEA2] leading-[1.8] text-base">
                Com rigor acadêmico e profundidade teológica, o autor analisa documentos históricos, pronunciamentos papais e tratados teológicos para oferecer uma investigação abrangente das transformações ocorridas na Igreja nas últimas décadas.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-[#B8AEA2] leading-[1.8] text-base">
                Por meio de uma análise meticulosa dessas fontes, a obra apresenta uma perspectiva singular sobre a crise de autoridade que muitos católicos percebem na Igreja contemporânea.
              </p>
              <p className="text-[#B8AEA2] leading-[1.8] text-base">
                Essencial para estudiosos, seminaristas, sacerdotes e leigos que desejam compreender as raízes dos debates atuais sobre tradição, autoridade e legitimidade no contexto eclesial. Uma leitura indispensável para todo católico que deseja compreender a crise atual da Igreja e buscar a verdade.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-10 mt-10 sm:mt-12 pt-8 border-t border-[rgba(201,168,76,0.1)]">
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-10 bg-[#C9A84C] rounded-full" />
              <div>
                <span className="font-cinzel-decorative text-[#C9A84C] text-3xl sm:text-4xl font-bold tracking-wide">400+</span>
                <p className="text-[10px] sm:text-xs text-[#8A8078] tracking-[0.2em] uppercase mt-0.5">Páginas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[3px] h-10 bg-[#C9A84C] rounded-full" />
              <div>
                <span className="font-cinzel-decorative text-[#C9A84C] text-3xl sm:text-4xl font-bold tracking-wide">8</span>
                <p className="text-[10px] sm:text-xs text-[#8A8078] tracking-[0.2em] uppercase mt-0.5">Capítulos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Amostra Grátis --- */
function FreeSampleSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("https://webn8n.duobro.com.br/webhook/book-maxence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      if (!res.ok) throw new Error("Webhook error")
      setSubmitted(true)
    } catch {
      setError("Erro ao processar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="amostra" className="py-8 sm:py-10 lg:py-16 bg-[#100E0C]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-12">
            {/* Book Image Left */}
            <div className="flex-shrink-0 hidden md:block">
              <img
                src="/images/livro/livro-perspec2.png"
                alt="A Crise de Autoridade na Igreja — Livro"
                className="w-[240px] lg:w-[300px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Form Card Right */}
            <div className="flex-1">
              <div className="rounded-2xl bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-[rgba(201,168,76,0.02)] border border-[rgba(201,168,76,0.15)] p-8 sm:p-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.1)] mb-6">
                  <Download size={28} className="text-[#C9A84C]" />
                </div>

                <h2 className="font-cinzel-decorative gold-text text-2xl sm:text-3xl font-bold mb-3">
                  Amostra Grátis
                </h2>
                <p className="text-[#B8AEA2] text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Receba gratuitamente o sumário e os primeiros capítulos do livro direto no seu e-mail. Conheça a obra antes de adquirir.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                    {error && (
                      <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/30 text-red-300 text-sm">
                        {error}
                      </div>
                    )}
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                        placeholder="Seu melhor e-mail"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="gold-glow w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Mail size={18} />
                          Quero Minha Amostra Grátis
                        </>
                      )}
                    </button>
                    <p className="text-xs text-[#6A6058]">
                      Sem spam. Seus dados estão seguros.
                    </p>
                  </form>
                ) : (
                  <div className="max-w-md mx-auto text-center py-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(201,168,76,0.15)] mb-4">
                      <CheckCircle size={28} className="text-[#C9A84C]" />
                    </div>
                    <h3 className="font-cinzel-decorative text-[#E8E0D4] text-xl font-bold mb-2">
                      Enviado com sucesso!
                    </h3>
                    <p className="text-[#B8AEA2] text-base">
                      Verifique sua caixa de entrada em <span className="text-[#C9A84C] font-medium">{email}</span>. A amostra será enviada em instantes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Quem é Maxence Hecquard --- */
function AuthorSection() {
  return (
    <section id="autor" className="livro-section-glow py-8 sm:py-10 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            {/* Author Photo with frame */}
            <div className="flex-shrink-0">
              <div className="livro-author-frame relative">
                <img
                  src="/images/livro/author-hecquard.png"
                  alt="Maxence Hecquard"
                  className="relative w-[280px] sm:w-[320px] md:w-[350px] aspect-[3/4] object-cover"
                />
              </div>
            </div>

            {/* Author Bio */}
            <div className="flex-1 text-center md:text-justify">
              <p className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Sobre o Autor
              </p>
              <h2 className="font-cinzel-decorative text-[#E8E0D4] text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
                Quem é{" "}
                <span className="gold-text">Maxence Hecquard?</span>
              </h2>

              <div className="space-y-4 mt-6">
                <p className="text-[#B8AEA2] leading-relaxed">
                  Maxence Hecquard é um renomado filósofo francês, reconhecido internacionalmente por seus estudos sobre a crise do mundo moderno e da Igreja Católica. Com formação em filosofia pela Sorbonne e estudos na ESSEC (École Supérieure de Sciences Économiques et Commerciales) e na Faculdade de Direito da Universidade Panthéon-Assas (Paris II), tem se dedicado nas últimas décadas ao estudo da autoridade eclesiástica, da tradição católica e das raízes intelectuais da modernidade.
                </p>
                <p className="text-[#B8AEA2] leading-relaxed">
                  É autor de <a href="https://loja.institutosantoatanasio.com.br/os-fundamentos-filosoficos-da-democracia-moderna" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] underline hover:text-[#D4B65C] transition-colors"><em>Les Fondements philosophiques de la démocratie moderne</em></a> (Os Fundamentos Filosóficos da Democracia Moderna), obra na qual examina as bases metafísicas e teológicas da ideologia democrática moderna, remontando suas origens à rejeição da autoridade divina e papal no pensamento iluminista.
                </p>
                <p className="text-[#B8AEA2] leading-relaxed">
                  Hecquard combina sólida erudição acadêmica com clareza expositiva, tornando temas complexos acessíveis ao público leigo sem sacrificar a profundidade filosófica e teológica.
                </p>
                <p className="text-[#B8AEA2] leading-relaxed">
                  Esta é sua primeira obra traduzida para o português, trazendo ao público lusófono uma análise fundamental para compreender os debates contemporâneos sobre a Igreja.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                {["Filósofo", "Doutor", "Escritor"].map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 rounded-full text-sm font-medium text-[#C9A84C] border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.05)] hover:bg-[rgba(201,168,76,0.1)] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Palavra do Bispo --- */
function BishopSection() {
  const [activePhoto, setActivePhoto] = useState(0)
  const bishopPhotos = ["/images/livro/dom-rodrigo.png", "/images/livro/dom-rodrigo-2.jpeg", "/images/livro/dom-rodrigo-3.png"]

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % bishopPhotos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="bispo" className="py-8 sm:py-10 lg:py-16 bg-[#100E0C]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            {/* Text content first on desktop (order swap) */}
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <p className="text-[#C9A84C] text-sm font-medium tracking-[0.2em] uppercase mb-3">
                Prefácio
              </p>
              <h2 className="font-cinzel-decorative text-[#E8E0D4] text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Palavra do{" "}
                <span className="gold-text">Bispo</span>
              </h2>

              <div className="relative">
                <Quote size={32} className="text-[#C9A84C] opacity-20 mb-4" />
                <div className="space-y-4 pl-2 border-l-2 border-[rgba(201,168,76,0.2)]">
                  <p className="font-serif text-[#D4C8B8] text-lg italic leading-relaxed">
                    Esta obra representa um marco para o público católico brasileiro. Com profundidade e clareza, Maxence Hecquard nos conduz através das questões fundamentais sobre a autoridade na Igreja, oferecendo luz em tempos de grande confusão.
                  </p>
                  <p className="font-serif text-[#D4C8B8] text-lg italic leading-relaxed">
                    Recomendo vivamente esta leitura a todos os fiéis que buscam compreender os acontecimentos que marcaram a Igreja no último século.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[#E8E0D4] font-cinzel-decorative font-bold text-lg">
                  Dom Rodrigo da Silva
                </p>
                <p className="text-[#8A8078] text-sm mt-0.5">
                  Bispo Católico
                </p>
              </div>
            </div>

            {/* Bishop Photo Carousel */}
            <div className="flex-shrink-0 order-1 md:order-2">
              <div className="relative w-[260px] sm:w-[300px] md:w-[340px] aspect-[3/4]">
                <div className="absolute -inset-4 rounded-2xl bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
                {bishopPhotos.map((photo, i) => (
                  <img
                    key={photo}
                    src={photo}
                    alt={`Dom Rodrigo — Bispo (${i + 1})`}
                    className={`absolute inset-0 w-full h-full rounded-2xl object-cover border border-[rgba(201,168,76,0.15)] shadow-2xl transition-opacity duration-1000 ${
                      activePhoto === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Pricing --- */
function PricingSection() {
  const tiers = [
    {
      name: "1º Lote",
      badge: "Ativo",
      badgeClass: "shimmer",
      active: true,
      originalPrice: "R$139,90",
      price: "R$89,90",
      discount: "25% off",
      note: "Frete grátis",
      features: [
        "Preço exclusivo de lançamento",
        "Unidades limitadas",
        "Envio assim que disponível",
      ],
    },
    {
      name: "2º Lote",
      badge: "Em breve",
      badgeClass: "bg-[#1C1917] text-[#8A8078] border border-[rgba(201,168,76,0.1)]",
      active: false,
      originalPrice: "R$139,90",
      price: "R$99,90",
      discount: "16% off",
      note: "+frete",
      features: [
        "Desconto de segundo lote",
        "Disponível após esgotamento do 1º",
        "Envio assim que disponível",
      ],
    },
    {
      name: "Normal",
      badge: "Futuro",
      badgeClass: "bg-[#1C1917] text-[#8A8078] border border-[rgba(201,168,76,0.1)]",
      active: false,
      originalPrice: null,
      price: "R$119,90",
      discount: null,
      note: "+frete",
      features: [
        "Preço normal sem desconto",
        "Disponível após os lotes",
        "Envio imediato",
      ],
    },
  ]

  return (
    <section id="precos" className="livro-section-glow py-8 sm:py-10 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-cinzel-decorative gold-text text-3xl sm:text-4xl font-bold mb-4">
            Garanta o Seu Exemplar
          </h2>
          <p className="text-[#8A8078]">
            Preço promocional por tempo limitado — aproveite o 1º Lote
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 transition-all ${
                tier.active
                  ? "livro-pricing-active scale-[1.02] md:scale-105"
                  : "bg-[#161412]/60 border border-[rgba(201,168,76,0.06)] opacity-70"
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-cinzel-decorative text-[#E8E0D4] text-lg font-bold">
                  {tier.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${tier.badgeClass}`}
                >
                  {tier.badge}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {tier.originalPrice && tier.discount && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-[#6A6058] line-through">
                      {tier.originalPrice}
                    </span>
                    <span className="text-xs bg-[rgba(201,168,76,0.15)] text-[#C9A84C] px-2 py-0.5 rounded-full font-bold">
                      {tier.discount}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-cinzel-decorative text-4xl font-bold ${
                      tier.active ? "text-[#C9A84C]" : "text-[#8A8078]"
                    }`}
                  >
                    {tier.price}
                  </span>
                </div>
                <span className={`text-xs mt-1 block ${tier.active && tier.note === "Frete grátis" ? "text-green-400 font-medium" : "text-[#6A6058]"}`}>
                  {tier.active && tier.note === "Frete grátis" ? `✓ ${tier.note}` : tier.note}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#B8AEA2]">
                    <CheckCircle
                      size={16}
                      className={`flex-shrink-0 mt-0.5 ${
                        tier.active ? "text-[#C9A84C]" : "text-[#6A6058]"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {tier.active ? (
                <a
                  href="#comprar"
                  className="gold-glow w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  Comprar Agora
                  <ChevronRight size={16} />
                </a>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-xl text-sm font-bold bg-[#1C1917] text-[#6A6058] border border-[rgba(201,168,76,0.06)] cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Clock size={16} />
                  Em breve
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Purchase Form --- */
function PurchaseSection() {
  const [step, setStep] = useState<PurchaseStep>("form")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    cpf: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
  })
  const [pixData, setPixData] = useState<{
    brCode: string
    qrCodeImage: string
    correlationID: string
  } | null>(null)
  const [error, setError] = useState("")
  const [cpfError, setCpfError] = useState("")
  const [cepError, setCepError] = useState("")
  const [copied, setCopied] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Poll OpenPix for payment confirmation
  useEffect(() => {
    if (step !== "pix" || !pixData?.correlationID || paymentConfirmed) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/pix-status?id=${pixData.correlationID}`)
        const data = await res.json()
        if (data.status === "COMPLETED") {
          setPaymentConfirmed(true)
          clearInterval(interval)
        }
      } catch { /* silent */ }
    }, 3000)
    return () => clearInterval(interval)
  }, [step, pixData?.correlationID, paymentConfirmed])

  function validateCPF(cpf: string): boolean {
    const nums = cpf.replace(/\D/g, "")
    if (nums.length !== 11) return false
    if (/^(\d)\1+$/.test(nums)) return false
    let sum = 0
    for (let i = 0; i < 9; i++) sum += parseInt(nums[i]) * (10 - i)
    let rest = (sum * 10) % 11
    if (rest === 10) rest = 0
    if (rest !== parseInt(nums[9])) return false
    sum = 0
    for (let i = 0; i < 10; i++) sum += parseInt(nums[i]) * (11 - i)
    rest = (sum * 10) % 11
    if (rest === 10) rest = 0
    return rest === parseInt(nums[10])
  }

  const pricePerUnit = 8990 // R$89,90 in cents
  const priceDisplay = "R$89,90"

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setCpfError("")
    setCepError("")

    // Validate CPF
    if (!validateCPF(form.cpf)) {
      setCpfError("CPF inválido. Verifique e tente novamente.")
      return
    }

    // Validate CEP
    const cleanCep = form.cep.replace(/\D/g, "")
    if (cleanCep.length !== 8) {
      setCepError("CEP inválido. Digite os 8 dígitos.")
      return
    }

    // Validate address fields filled (CEP lookup must have worked)
    if (!form.rua || !form.bairro || !form.cidade || !form.uf) {
      setCepError("CEP não encontrado. Verifique e tente novamente.")
      return
    }

    setStep("processing")

    try {
      const correlationID = `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const totalCents = pricePerUnit * form.quantity

      const res = await fetch("/api/pix-charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correlationID,
          name: form.name,
          email: form.email,
          phone: form.phone,
          quantity: form.quantity,
          totalAmount: totalCents / 100,
          cpf: form.cpf,
        }),
      })

      if (!res.ok) throw new Error("Erro ao gerar cobrança PIX")

      const data = await res.json().catch(() => ({}))

      if (data?.brCode && data?.qrCodeImage) {
        setPixData({
          brCode: data.brCode,
          qrCodeImage: data.qrCodeImage,
          correlationID: data.correlationID || correlationID,
        })
        setStep("pix")
      } else {
        setStep("done")
      }
    } catch {
      setError("Erro ao gerar cobrança PIX. Tente novamente ou entre em contato.")
      setStep("form")
    }
  }

  function handleCopy() {
    if (pixData?.brCode) {
      navigator.clipboard.writeText(pixData.brCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="comprar" className="livro-section-glow py-8 sm:py-10 lg:py-16 bg-[#100E0C]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-cinzel-decorative gold-text text-3xl sm:text-4xl font-bold mb-4">
              Faça sua Encomenda
            </h2>
            <p className="text-[#8A8078]">
              1º Lote — <span className="text-[#C9A84C] font-semibold">{priceDisplay}</span> por exemplar{" "}
              <span className="text-green-400 text-xs font-medium">✓ Frete grátis · 1º Lote</span>
            </p>
          </div>

          <div className="rounded-2xl bg-[#161412]/80 border border-[rgba(201,168,76,0.12)] p-6 sm:p-8">
            {step === "form" && (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/30 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                      Telefone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                    CPF <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.cpf}
                    onChange={(e) => {
                      const nums = e.target.value.replace(/\D/g, "").slice(0, 11)
                      let formatted = nums
                      if (nums.length > 9) formatted = `${nums.slice(0,3)}.${nums.slice(3,6)}.${nums.slice(6,9)}-${nums.slice(9)}`
                      else if (nums.length > 6) formatted = `${nums.slice(0,3)}.${nums.slice(3,6)}.${nums.slice(6)}`
                      else if (nums.length > 3) formatted = `${nums.slice(0,3)}.${nums.slice(3)}`
                      setForm({ ...form, cpf: formatted })
                      if (cpfError) setCpfError("")
                    }}
                    onBlur={() => {
                      if (form.cpf && !validateCPF(form.cpf)) {
                        setCpfError("CPF inválido")
                      } else {
                        setCpfError("")
                      }
                    }}
                    maxLength={14}
                    className={`livro-dark-input w-full px-4 py-3 rounded-xl text-sm ${cpfError ? "border border-red-500" : ""}`}
                    placeholder="000.000.000-00"
                  />
                  {cpfError && <p className="text-red-400 text-xs mt-1">{cpfError}</p>}
                </div>

                {/* Endereço de Entrega */}
                <div>
                  <p className="text-sm font-semibold text-[#C9A84C] mb-3 uppercase tracking-wide">
                    Endereço de Entrega
                  </p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#D4C8B8] mb-1">
                          CEP <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.cep}
                          onChange={async (e) => {
                            const cep = e.target.value.replace(/\D/g, "")
                            const formatted = cep.length > 5 ? cep.slice(0, 5) + "-" + cep.slice(5, 8) : cep
                            setForm((prev) => ({ ...prev, cep: formatted, rua: "", bairro: "", cidade: "", uf: "" }))
                            if (cepError) setCepError("")
                            if (cep.length === 8) {
                              try {
                                const res = await fetch(`/api/cep?cep=${cep}`)
                                const data = await res.json()
                                if (!data.erro) {
                                  setForm((prev) => ({
                                    ...prev,
                                    cep: formatted,
                                    rua: data.logradouro || "",
                                    bairro: data.bairro || "",
                                    cidade: data.localidade || "",
                                    uf: data.uf || "",
                                  }))
                                  setCepError("")
                                } else {
                                  setCepError("CEP não encontrado")
                                }
                              } catch {
                                setCepError("Erro ao buscar CEP")
                              }
                            }
                          }}
                          maxLength={9}
                          className={`livro-dark-input w-full px-3 py-2.5 rounded-xl text-sm ${cepError ? "border border-red-500" : ""}`}
                          placeholder="00000-000"
                        />
                        {cepError && <p className="text-red-400 text-xs mt-1">{cepError}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#D4C8B8] mb-1">
                          UF <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={2}
                          value={form.uf}
                          onChange={(e) => setForm({ ...form, uf: e.target.value.toUpperCase() })}
                          className="livro-dark-input w-full px-3 py-2.5 rounded-xl text-sm"
                          placeholder="SP"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-[#D4C8B8] mb-1">
                          Rua / Logradouro <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.rua}
                          onChange={(e) => setForm({ ...form, rua: e.target.value })}
                          className="livro-dark-input w-full px-3 py-2.5 rounded-xl text-sm"
                          placeholder="Nome da rua"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#D4C8B8] mb-1">
                          Número <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.numero}
                          onChange={(e) => setForm({ ...form, numero: e.target.value })}
                          className="livro-dark-input w-full px-3 py-2.5 rounded-xl text-sm"
                          placeholder="Nº"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#D4C8B8] mb-1">
                        Complemento <span className="text-[#6A6058]">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.complemento}
                        onChange={(e) => setForm({ ...form, complemento: e.target.value })}
                        className="livro-dark-input w-full px-3 py-2.5 rounded-xl text-sm"
                        placeholder="Apto, bloco, casa..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#D4C8B8] mb-1">
                          Bairro <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.bairro}
                          onChange={(e) => setForm({ ...form, bairro: e.target.value })}
                          className="livro-dark-input w-full px-3 py-2.5 rounded-xl text-sm"
                          placeholder="Bairro"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#D4C8B8] mb-1">
                          Cidade <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.cidade}
                          onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                          className="livro-dark-input w-full px-3 py-2.5 rounded-xl text-sm"
                          placeholder="Cidade"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                    Quantidade
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })}
                      className="w-10 h-10 rounded-lg bg-[#1C1917] border border-[rgba(201,168,76,0.15)] text-[#C9A84C] font-bold text-lg flex items-center justify-center hover:bg-[rgba(201,168,76,0.1)] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-[#E8E0D4] w-12 text-center font-cinzel-decorative">
                      {form.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, quantity: Math.min(10, form.quantity + 1) })}
                      className="w-10 h-10 rounded-lg bg-[#1C1917] border border-[rgba(201,168,76,0.15)] text-[#C9A84C] font-bold text-lg flex items-center justify-center hover:bg-[rgba(201,168,76,0.1)] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)]">
                  <span className="text-sm text-[#D4C8B8]">Total</span>
                  <span className="font-cinzel-decorative text-2xl font-bold text-[#C9A84C]">
                    R${((pricePerUnit * form.quantity) / 100).toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  type="submit"
                  className="gold-glow w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2"
                >
                  Pagar com PIX
                  <ChevronRight size={18} />
                </button>

                <p className="text-xs text-center text-[#6A6058]">
                  Pagamento seguro via PIX. <span className="text-green-400">✓ Frete grátis no 1º Lote.</span>
                </p>
              </form>
            )}

            {step === "processing" && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Loader2 size={40} className="text-[#C9A84C] animate-spin" />
                <p className="text-[#D4C8B8] font-medium">
                  Gerando cobrança PIX...
                </p>
              </div>
            )}

            {step === "pix" && pixData && (
              <div className="space-y-6">
                {paymentConfirmed ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(34,197,94,0.15)] mb-2 animate-[scaleIn_0.4s_ease-out]">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="font-cinzel-decorative text-green-400 text-xl font-bold">
                      Pagamento Confirmado!
                    </h3>
                    <p className="text-sm text-[#B8AEA2] max-w-xs">
                      Obrigado, {form.name.split(" ")[0]}! Seu pedido de {form.quantity}x exemplar{form.quantity > 1 ? "es" : ""} foi confirmado.
                    </p>
                    <p className="text-xs text-[#8A8078]">
                      Confirmação enviada para {form.email}
                    </p>
                    <div className="p-4 rounded-xl bg-[rgba(34,197,94,0.05)] border border-[rgba(34,197,94,0.2)] w-full mt-2">
                      <p className="text-sm text-green-400 font-medium">
                        R${((pricePerUnit * form.quantity) / 100).toFixed(2).replace(".", ",")} recebido com sucesso
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setStep("form")
                        setPixData(null)
                        setPaymentConfirmed(false)
                        setForm({ name: "", email: "", phone: "", quantity: 1, cpf: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "", cep: "" })
                      }}
                      className="w-full py-3 rounded-xl text-sm text-[#8A8078] border border-[rgba(201,168,76,0.08)] hover:text-[#D4C8B8] hover:border-[rgba(201,168,76,0.2)] transition-colors mt-2"
                    >
                      Fazer nova encomenda
                    </button>
                  </div>
                ) : (
                <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.1)] text-[#C9A84C] px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Clock size={16} />
                    Aguardando pagamento
                  </div>
                  <h3 className="font-cinzel-decorative text-[#E8E0D4] text-xl font-bold mb-2">
                    Escaneie o QR Code
                  </h3>
                  <p className="text-sm text-[#8A8078]">
                    Abra o app do seu banco e escaneie o código abaixo
                  </p>
                </div>

                {pixData.qrCodeImage && (
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl">
                      <img
                        src={pixData.qrCodeImage}
                        alt="QR Code PIX"
                        className="w-48 h-48"
                      />
                    </div>
                  </div>
                )}

                {pixData.brCode && (
                  <div>
                    <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                      Ou copie o código PIX:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixData.brCode}
                        className="livro-dark-input flex-1 px-4 py-3 rounded-xl text-xs font-mono"
                      />
                      <button
                        onClick={handleCopy}
                        className="flex-shrink-0 p-3 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.2)] transition-colors"
                      >
                        {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                    {copied && (
                      <p className="text-xs text-[#C9A84C] mt-1">
                        Código copiado!
                      </p>
                    )}
                  </div>
                )}

                <div className="p-4 rounded-xl bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)]">
                  <p className="text-sm text-[#B8AEA2]">
                    <strong className="text-[#D4C8B8]">Total:</strong>{" "}
                    R${((pricePerUnit * form.quantity) / 100).toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-xs text-[#8A8078] mt-1">
                    A confirmação aparecerá automaticamente após o pagamento
                  </p>
                </div>

                <button
                  onClick={() => {
                    setStep("form")
                    setPixData(null)
                    setPaymentConfirmed(false)
                    setForm({ name: "", email: "", phone: "", quantity: 1, cpf: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "", cep: "" })
                  }}
                  className="w-full py-3 rounded-xl text-sm text-[#8A8078] border border-[rgba(201,168,76,0.08)] hover:text-[#D4C8B8] hover:border-[rgba(201,168,76,0.2)] transition-colors"
                >
                  Fazer nova encomenda
                </button>
                </div>
                )}
              </div>
            )}

            {step === "done" && (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(201,168,76,0.15)] mb-2">
                  <CheckCircle size={32} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-cinzel-decorative text-[#E8E0D4] text-xl font-bold">
                  Encomenda recebida!
                </h3>
                <p className="text-[#B8AEA2] text-sm max-w-sm">
                  Sua encomenda foi registrada com sucesso. Você receberá as instruções de pagamento no e-mail <span className="text-[#C9A84C]">{form.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setStep("form")
                    setForm({ name: "", email: "", phone: "", quantity: 1, cpf: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "", cep: "" })
                  }}
                  className="mt-2 text-sm text-[#8A8078] hover:text-[#D4C8B8] transition-colors"
                >
                  Fazer nova encomenda
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Donation --- */
function DonationSection() {
  const [step, setStep] = useState<DonationStep>("form")
  const [form, setForm] = useState({ name: "", email: "", amount: "", observation: "" })
  const [pixData, setPixData] = useState<{
    brCode: string
    qrCodeImage: string
    correlationID: string
  } | null>(null)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  // Poll OpenPix for donation payment confirmation
  useEffect(() => {
    if (step !== "pix" || !pixData?.correlationID || paymentConfirmed) return
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/pix-status?id=${pixData.correlationID}`)
        const data = await res.json()
        if (data.status === "COMPLETED") {
          setPaymentConfirmed(true)
          clearInterval(interval)
        }
      } catch { /* silent */ }
    }, 3000)
    return () => clearInterval(interval)
  }, [step, pixData?.correlationID, paymentConfirmed])

  async function handleDonate(e: FormEvent) {
    e.preventDefault()
    setError("")
    const amountNum = Number.parseFloat(form.amount.replace(",", "."))
    if (!amountNum || amountNum < 1) {
      setError("Valor mínimo de R$1,00")
      return
    }
    setStep("processing")

    try {
      const correlationID = `donation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

      const res = await fetch("/api/pix-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          amount: amountNum,
          observation: form.observation,
        }),
      })

      if (!res.ok) throw new Error("Erro ao gerar doação PIX")

      const data = await res.json().catch(() => ({}))

      if (data?.brCode && data?.qrCodeImage) {
        setPixData({ brCode: data.brCode, qrCodeImage: data.qrCodeImage, correlationID: data.correlationID || "" })
        setStep("pix")
      } else {
        setStep("done")
      }
    } catch {
      setError("Erro ao gerar doação. Tente novamente.")
      setStep("form")
    }
  }

  return (
    <section id="doacao" className="livro-section-glow py-8 sm:py-10 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <Heart size={36} className="text-[#C9A84C] mx-auto mb-4 opacity-60" />
          <h2 className="font-cinzel-decorative text-[#E8E0D4] text-2xl sm:text-3xl font-bold mb-4">
            Apoie o Seminário São José
          </h2>
          <p className="text-[#8A8078] text-base mb-8 leading-relaxed">
            Contribua para a formação de sacerdotes fiéis à Tradição. Sua doação ajuda a manter o Seminário São José e sua missão de preservar a Fé Católica.
          </p>

          {!showForm && step === "form" && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-lg shadow-green-900/30"
            >
              <Heart size={18} />
              Apoie o Seminário São José
            </button>
          )}

          {showForm && step === "form" && (
            <form onSubmit={handleDonate} className="text-left space-y-4 mt-6 rounded-2xl bg-[#161412]/80 border border-[rgba(201,168,76,0.12)] p-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/30 text-red-300 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">Nome</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">E-mail</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                  Valor da Doação (R$)
                </label>
                <input
                  type="text"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="50,00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                  Observação <span className="text-[#8A8078] font-normal">(opcional)</span>
                </label>
                <textarea
                  maxLength={200}
                  value={form.observation}
                  onChange={(e) => setForm({ ...form, observation: e.target.value })}
                  className="livro-dark-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                  placeholder="Deixe uma mensagem (máx. 200 caracteres)"
                  rows={3}
                />
                <p className="text-xs text-[#6A6058] mt-1 text-right">{form.observation.length}/200</p>
              </div>
              <button
                type="submit"
                className="gold-glow w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <Heart size={16} />
                Doar via PIX
              </button>
            </form>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12 gap-4 mt-6">
              <Loader2 size={36} className="text-[#C9A84C] animate-spin" />
              <p className="text-[#D4C8B8] font-medium">Gerando doação PIX...</p>
            </div>
          )}

          {step === "pix" && pixData && (
            <div className="mt-6 space-y-6 rounded-2xl bg-[#161412]/80 border border-[rgba(201,168,76,0.12)] p-6">
              {paymentConfirmed ? (
                <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(34,197,94,0.15)] mb-2">
                    <CheckCircle size={40} className="text-green-500" />
                  </div>
                  <h3 className="font-cinzel-decorative text-green-400 text-xl font-bold">
                    Doação Confirmada!
                  </h3>
                  <p className="text-sm text-[#B8AEA2] max-w-xs">
                    Obrigado, {form.name.split(" ")[0]}! Sua doação de R${form.amount.replace(".", ",")} foi recebida.
                  </p>
                  <p className="text-xs text-[#8A8078]">
                    Que Deus abençoe sua generosidade.
                  </p>
                  <button
                    onClick={() => {
                      setStep("form")
                      setPixData(null)
                      setPaymentConfirmed(false)
                      setForm({ name: "", email: "", amount: "", observation: "" })
                      setShowForm(false)
                    }}
                    className="w-full py-3 rounded-xl text-sm text-[#8A8078] border border-[rgba(201,168,76,0.08)] hover:text-[#D4C8B8] transition-colors mt-2"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
              <>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.1)] text-[#C9A84C] px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <Clock size={16} />
                  Aguardando pagamento
                </div>
              </div>
              {pixData.qrCodeImage && (
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-xl">
                    <img
                      src={pixData.qrCodeImage}
                      alt="QR Code PIX Doação"
                      className="w-40 h-40"
                    />
                  </div>
                </div>
              )}
              {pixData.brCode && (
                <div className="text-left">
                  <label className="block text-sm font-medium text-[#D4C8B8] mb-1.5">
                    Código PIX:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixData.brCode}
                      className="livro-dark-input flex-1 px-4 py-3 rounded-xl text-xs font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(pixData.brCode)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="flex-shrink-0 p-3 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] text-[#C9A84C]"
                    >
                      {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              )}
              <p className="text-xs text-center text-[#8A8078]">
                A confirmação aparecerá automaticamente após o pagamento
              </p>
              <button
                onClick={() => {
                  setStep("form")
                  setPixData(null)
                  setPaymentConfirmed(false)
                  setForm({ name: "", email: "", amount: "", observation: "" })
                  setShowForm(false)
                }}
                className="w-full py-3 rounded-xl text-sm text-[#8A8078] border border-[rgba(201,168,76,0.08)] hover:text-[#D4C8B8] transition-colors"
              >
                Fechar
              </button>
              </>
              )}
            </div>
          )}

          {step === "done" && (
            <div className="mt-6 flex flex-col items-center gap-4 py-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[rgba(201,168,76,0.15)]">
                <CheckCircle size={28} className="text-[#C9A84C]" />
              </div>
              <p className="text-[#D4C8B8] font-medium">Doação registrada!</p>
              <p className="text-[#8A8078] text-sm">Obrigado pelo apoio ao Seminário São José.</p>
              <button
                onClick={() => {
                  setStep("form")
                  setForm({ name: "", email: "", amount: "", observation: "" })
                  setShowForm(false)
                }}
                className="text-sm text-[#8A8078] hover:text-[#D4C8B8] transition-colors"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* --- SECTION: Footer --- */
function LivroFooter() {
  return (
    <footer className="py-10 border-t border-[rgba(201,168,76,0.08)]">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <p className="font-cinzel-decorative text-[#C9A84C] text-lg font-bold mb-2">
          Sedevacante
        </p>
        <p className="text-xs text-[#6A6058]">
          © 2026 Sedevacante. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */
export default function LivroCriseNaIgrejaPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#E8E0D4]">
      <Navbar />
      <HeroSection />
      <AboutPapasSection />
      <FreeSampleSection />
      <AuthorSection />
      <BishopSection />
      <PricingSection />
      <PurchaseSection />
      <DonationSection />
      <LivroFooter />
    </div>
  )
}
