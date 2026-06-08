"use client"

import { useState } from "react"

export default function CorrectionButton({ slug, titulo }: { slug: string; titulo: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error" | "limit">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleClick = async () => {
    setStatus("loading")
    try {
      const res = await fetch("/api/correction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, titulo }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus("sent")
      } else if (res.status === 429) {
        setStatus("limit")
        setErrorMsg(data.error || "Limite de correções atingido.")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-muted-foreground font-serif italic">
        ✔ Pedido de correção enviado. Obrigado.
      </p>
    )
  }

  if (status === "limit") {
    return (
      <p className="text-sm text-amber-600 font-serif italic">
        ⚠ {errorMsg}
      </p>
    )
  }

  return (
    <div className="mt-6 mb-4">
      <button
        onClick={handleClick}
        disabled={status === "loading"}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans rounded-[3px] border transition-colors ${
          status === "error"
            ? "border-red-300 text-red-600 bg-red-50"
            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
        }`}
      >
        {status === "loading" ? (
          <span className="animate-pulse">Enviando...</span>
        ) : status === "error" ? (
          "⚠ Erro — tente novamente"
        ) : (
          "Pedir correção"
        )}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500 mt-1">
          Não foi possível enviar. Tente novamente.
        </p>
      )}
    </div>
  )
}
