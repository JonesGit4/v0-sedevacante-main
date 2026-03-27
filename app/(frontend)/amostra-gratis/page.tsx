"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"

export default function AmostraGratisPage() {
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
    <div className="min-h-screen bg-[#0C0A09] flex items-start sm:items-center justify-center px-4 pt-24 pb-10 sm:py-20">
      <div className="max-w-lg w-full">
        {/* Book cover */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/livro/livro-perspec2.png"
            alt="A Crise de Autoridade na Igreja"
            width={220}
            height={320}
            className="w-[160px] sm:w-[220px] drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-[rgba(201,168,76,0.02)] border border-[rgba(201,168,76,0.15)] p-6 sm:p-10 text-center">
          <h1 className="font-cinzel-decorative text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#C9A84C" }}>
            Amostra Grátis
          </h1>
          <p className="text-[#B8AEA2] text-base mb-8 max-w-md mx-auto leading-relaxed">
            Receba gratuitamente o sumário e os primeiros capítulos do livro
            <strong className="text-[#E8E0D4]"> A Crise de Autoridade na Igreja </strong>
            direto no seu e-mail.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/30 text-red-300 text-sm">
                  {error}
                </div>
              )}
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-[#1A1714] border border-[rgba(201,168,76,0.12)] text-[#E8E0D4] placeholder-[#6A6058] focus:border-[rgba(201,168,76,0.4)] focus:outline-none"
                placeholder="Seu nome"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm bg-[#1A1714] border border-[rgba(201,168,76,0.12)] text-[#E8E0D4] placeholder-[#6A6058] focus:border-[rgba(201,168,76,0.4)] focus:outline-none"
                placeholder="Seu melhor e-mail"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b89a3e] text-[#0C0A09] transition-colors disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Quero Minha Amostra Grátis"}
              </button>
              <p className="text-xs text-[#6A6058]">Sem spam. Seus dados estão seguros.</p>
            </form>
          ) : (
            <div className="max-w-md mx-auto text-center py-4">
              <div className="text-[#C9A84C] text-4xl mb-4">&#10003;</div>
              <h3 className="font-cinzel-decorative text-[#E8E0D4] text-xl font-bold mb-2">
                Enviado com sucesso!
              </h3>
              <p className="text-[#B8AEA2] text-base">
                Verifique sua caixa de entrada em <span className="text-[#C9A84C] font-medium">{email}</span>. A amostra será enviada em instantes.
              </p>
            </div>
          )}
        </div>

        {/* Link para o livro completo */}
        <div className="text-center mt-6">
          <a href="/livrocrisenaigreja" className="text-sm text-[#8A8078] hover:text-[#C9A84C] transition-colors">
            Ver página completa do livro →
          </a>
        </div>
      </div>
    </div>
  )
}
