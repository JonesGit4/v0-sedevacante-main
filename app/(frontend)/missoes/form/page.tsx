'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Upload, X, CheckCircle2, AlertCircle } from 'lucide-react'

// ─── Schema ───────────────────────────────────────────
const missionSchema = z.object({
  nome: z.string().min(3, 'Nome da missão é obrigatório'),
  descricao: z.string().min(10, 'Descreva a missão com pelo menos 10 caracteres'),
  rito: z.enum(['Tridentino', 'Novus Ordo', 'Ambos']),
  status: z.enum(['Ativa', 'Em formação', 'Suspensa']),
  jurisdicao: z.string().optional(),
  padre_responsavel: z.string().optional(),
  logradouro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  cep: z.string().optional(),
  coordenadas: z.string().optional(),
  dias_missas: z.string().optional(),
  dias_confissao: z.string().optional(),
  capacidade: z.coerce.number().int().positive().optional().or(z.literal(0)),
  telefone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  telegram: z.string().optional(),
  site_redes: z.string().optional(),
  observacoes: z.string().optional(),
})

type MissionForm = z.infer<typeof missionSchema>

// ─── Estados brasileiros ──────────────────────────────
const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
]

// ─── API route interna (same-origin) ───────────────────
const SUBMIT_URL = '/api/mission-submit'

export default function MissionFormPage() {
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MissionForm>({
    resolver: zodResolver(missionSchema),
  })

  // ─── Compress image before upload ────────────────────
  async function compressImage(file: File): Promise<File> {
    return new Promise((resolve) => {
      // Skip if already small (< 300KB)
      if (file.size < 300 * 1024) {
        resolve(file)
        return
      }
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX = 1200
        let { width, height } = img
        if (width > MAX || height > MAX) {
          const ratio = Math.min(MAX / width, MAX / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (!blob) { resolve(file); return }
            resolve(new File([blob], file.name, { type: 'image/jpeg' }))
          },
          'image/jpeg',
          0.7
        )
      }
      img.src = URL.createObjectURL(file)
    })
  }

  // ─── Handle photo selection ──────────────────────────
  async function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const total = [...photos, ...files]
    if (total.length > 10) {
      setError('Máximo de 10 fotos permitido')
      return
    }
    setError('')
    // Compress all new files
    const compressed = await Promise.all(files.map(compressImage))
    const newPhotos = [...photos, ...compressed]
    setPhotos(newPhotos)
    setPhotoPreviews(newPhotos.map(f => URL.createObjectURL(f)))
  }

  function removePhoto(index: number) {
    const newPhotos = photos.filter((_, i) => i !== index)
    const newPreviews = photoPreviews.filter((_, i) => i !== index)
    setPhotos(newPhotos)
    setPhotoPreviews(newPreviews)
    setError('')
  }

  // ─── Submit ──────────────────────────────────────────
  async function onSubmit(data: MissionForm) {
    setError('')
    try {
      const formData = new FormData()
      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formData.append(key, String(value))
        }
      })
      // Append photos
      photos.forEach((file) => {
        formData.append('photos', file)
      })

      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error(`Erro ${res.status}`)
      setSubmitted(true)
      reset()
      setPhotos([])
      setPhotoPreviews([])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar formulário')
    }
  }

  // ─── Success state ───────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-[#83071B] mb-3">
            Missão cadastrada!
          </h2>
          <p className="text-neutral-600 mb-6">
            Os dados da missão foram enviados com sucesso. Em breve entraremos em contato.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 bg-[#83071B] text-white rounded-lg font-medium hover:bg-[#6a0616] transition-colors"
          >
            Cadastrar outra missão
          </button>
        </div>
      </main>
    )
  }

  // ─── Form ────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-[#83071B] mb-2">
            Cadastro de Missões
          </h1>
          <p className="text-neutral-500 text-sm">
            Sedevacante — Tradição Católica Apostólica Romana
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 md:p-8 space-y-8">
          {/* ── Seção 1: Identificação ── */}
          <fieldset>
            <legend className="font-display text-lg text-[#83071B] mb-4 pb-2 border-b border-stone-200 w-full">
              Identificação da Missão
            </legend>
            <div className="space-y-4">
              <InputField label="Nome da Missão *" error={errors.nome?.message}>
                <input {...register('nome')} placeholder="Ex: Missão Nossa Senhora do Carmo" className={inputClass} />
              </InputField>
              <InputField label="Descrição *" error={errors.descricao?.message}>
                <textarea {...register('descricao')} rows={3} placeholder="Descreva a missão, sua história, comunidade..." className={inputClass} />
              </InputField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Tipo de Rito" error={errors.rito?.message}>
                  <select {...register('rito')} className={inputClass}>
                    <option value="">Selecione...</option>
                    <option value="Tridentino">Tridentino</option>
                    <option value="Novus Ordo">Novus Ordo</option>
                    <option value="Ambos">Ambos</option>
                  </select>
                </InputField>
                <InputField label="Status" error={errors.status?.message}>
                  <select {...register('status')} className={inputClass}>
                    <option value="">Selecione...</option>
                    <option value="Ativa">Ativa</option>
                    <option value="Em formação">Em formação</option>
                    <option value="Suspensa">Suspensa</option>
                  </select>
                </InputField>
              </div>
              <InputField label="Jurisdição" error={errors.jurisdicao?.message}>
                <input {...register('jurisdicao')} placeholder="Ex: Diocese de São Paulo, Instituto X..." className={inputClass} />
              </InputField>
              <InputField label="Padre Responsável" error={errors.padre_responsavel?.message}>
                <input {...register('padre_responsavel')} placeholder="Nome do padre responsável" className={inputClass} />
              </InputField>
            </div>
          </fieldset>

          {/* ── Seção 2: Localização ── */}
          <fieldset>
            <legend className="font-display text-lg text-[#83071B] mb-4 pb-2 border-b border-stone-200 w-full">
              Localização
            </legend>
            <div className="space-y-4">
              <InputField label="Logradouro" error={errors.logradouro?.message}>
                <input {...register('logradouro')} placeholder="Rua, número, bairro" className={inputClass} />
              </InputField>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <InputField label="Cidade" error={errors.cidade?.message}>
                  <input {...register('cidade')} className={inputClass} />
                </InputField>
                <InputField label="Estado" error={errors.estado?.message}>
                  <select {...register('estado')} className={inputClass}>
                    <option value="">UF</option>
                    {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </InputField>
                <InputField label="CEP" error={errors.cep?.message}>
                  <input {...register('cep')} placeholder="00000-000" className={inputClass} />
                </InputField>
              </div>
              <InputField label="Coordenadas GPS" hint="Formato: latitude, longitude" error={errors.coordenadas?.message}>
                <input {...register('coordenadas')} placeholder="Ex: -23.5505, -46.6333" className={inputClass} />
              </InputField>
            </div>
          </fieldset>

          {/* ── Seção 3: Horários ── */}
          <fieldset>
            <legend className="font-display text-lg text-[#83071B] mb-4 pb-2 border-b border-stone-200 w-full">
              Horários e Capacidade
            </legend>
            <div className="space-y-4">
              <InputField label="Dia e horário das Missas" error={errors.dias_missas?.message}>
                <textarea {...register('dias_missas')} rows={2} placeholder="Ex: Domingo 8h e 18h, Quarta 19h" className={inputClass} />
              </InputField>
              <InputField label="Dias de Confissão" error={errors.dias_confissao?.message}>
                <input {...register('dias_confissao')} placeholder="Ex: 30min antes de cada Missa" className={inputClass} />
              </InputField>
              <InputField label="Capacidade de fiéis" hint="Número aproximado de lugares" error={errors.capacidade?.message}>
                <input {...register('capacidade')} type="number" min={0} className={inputClass} />
              </InputField>
            </div>
          </fieldset>

          {/* ── Seção 4: Contato ── */}
          <fieldset>
            <legend className="font-display text-lg text-[#83071B] mb-4 pb-2 border-b border-stone-200 w-full">
              Contato
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Telefone" error={errors.telefone?.message}>
                <input {...register('telefone')} placeholder="(00) 00000-0000" className={inputClass} />
              </InputField>
              <InputField label="WhatsApp" error={errors.whatsapp?.message}>
                <input {...register('whatsapp')} placeholder="(00) 00000-0000" className={inputClass} />
              </InputField>
              <InputField label="Email" error={errors.email?.message}>
                <input {...register('email')} type="email" placeholder="missao@email.com" className={inputClass} />
              </InputField>
              <InputField label="Telegram" error={errors.telegram?.message}>
                <input {...register('telegram')} placeholder="@usuario ou link" className={inputClass} />
              </InputField>
            </div>
            <div className="mt-4">
              <InputField label="Site / Redes Sociais" error={errors.site_redes?.message}>
                <input {...register('site_redes')} placeholder="Instagram, Facebook, site..." className={inputClass} />
              </InputField>
            </div>
          </fieldset>

          {/* ── Seção 5: Fotos ── */}
          <fieldset>
            <legend className="font-display text-lg text-[#83071B] mb-4 pb-2 border-b border-stone-200 w-full">
              Fotos da Missão
            </legend>
            <p className="text-sm text-neutral-500 mb-3">Até 10 fotos. Envie imagens da igreja, altar, comunidade, etc.</p>

            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {photoPreviews.map((preview, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-stone-200 group">
                    <img src={preview} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:border-[#83071B] hover:bg-stone-50 transition-colors">
              <Upload className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-500">
                {photos.length > 0 ? `${photos.length} foto(s) selecionada(s) — clique para adicionar mais` : 'Clique para selecionar as fotos'}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotos}
                className="hidden"
              />
            </label>
          </fieldset>

          {/* ── Seção 6: Observações ── */}
          <fieldset>
            <legend className="font-display text-lg text-[#83071B] mb-4 pb-2 border-b border-stone-200 w-full">
              Observações
            </legend>
            <InputField label="Informações adicionais" error={errors.observacoes?.message}>
              <textarea {...register('observacoes')} rows={3} placeholder="Qualquer informação relevante sobre a missão..." className={inputClass} />
            </InputField>
          </fieldset>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#83071B] text-white font-medium rounded-lg hover:bg-[#6a0616] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Cadastro da Missão'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

// ─── Helper components ────────────────────────────────
function InputField({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-stone-700">
        {label}
        {hint && <span className="text-xs text-neutral-400 ml-1.5 font-normal">({hint})</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

// ─── Shared input class ───────────────────────────────
const inputClass =
  'w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#83071B]/20 focus:border-[#83071B] transition-colors'
