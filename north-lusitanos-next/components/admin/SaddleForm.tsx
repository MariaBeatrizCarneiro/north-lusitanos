'use client'

import { useState, useCallback } from 'react'
import type { Saddle, SaddleInput, SaddleType } from '@/types/saddle'

interface SaddleFormProps {
  initial?: Saddle
  onSave: (data: SaddleInput) => Promise<void>
  onCancel: () => void
}

const EMPTY: SaddleInput = {
  name: '',
  type: 'dressage',
  size: '',
  material: 'Couro',
  price: 0,
  description: '',
  sold: false,
  photos: [],
}

export default function SaddleForm({ initial, onSave, onCancel }: SaddleFormProps) {
  const [form, setForm] = useState<SaddleInput>(
    initial
      ? { name: initial.name, type: initial.type, size: initial.size.replace(/"/g, ''), material: initial.material, price: initial.price, description: initial.description, sold: initial.sold, photos: initial.photos }
      : EMPTY
  )
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const set = (field: keyof SaddleInput, value: unknown) =>
    setForm(f => ({ ...f, [field]: value }))

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploadError('')
    setUploading(true)

    const urls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) {
        const { error } = await res.json()
        setUploadError(error ?? 'Erro ao fazer upload.')
        setUploading(false)
        return
      }
      const { url } = await res.json()
      urls.push(url)
    }

    setForm(f => ({ ...f, photos: [...f.photos, ...urls] }))
    setUploading(false)
  }, [])

  const removePhoto = (idx: number) =>
    setForm(f => ({ ...f, photos: f.photos.filter((_, i) => i !== idx) }))

  const movePhoto = (from: number, to: number) => {
    const photos = [...form.photos]
    const [item] = photos.splice(from, 1)
    photos.splice(to, 0, item)
    setForm(f => ({ ...f, photos }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Nome */}
      <div>
        <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-1">Nome da Sela *</label>
        <input
          required
          value={form.name}
          onChange={e => set('name', e.target.value)}
          className="w-full border border-[#182A47]/20 rounded-sm px-3 py-2 text-[0.9rem] outline-none focus:border-[#182A47] transition-colors"
          placeholder="ex: Prestige Archimede"
        />
      </div>

      {/* Tipo + Tamanho */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-1">Tipo *</label>
          <select
            value={form.type}
            onChange={e => set('type', e.target.value as SaddleType)}
            className="w-full border border-[#182A47]/20 rounded-sm px-3 py-2 text-[0.9rem] outline-none focus:border-[#182A47] transition-colors bg-white"
          >
            <option value="dressage">Dressage</option>
            <option value="salto">Salto</option>
          </select>
        </div>
        <div>
          <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-1">Tamanho *</label>
          <input
            required
            value={form.size}
            onChange={e => set('size', e.target.value)}
            className="w-full border border-[#182A47]/20 rounded-sm px-3 py-2 text-[0.9rem] outline-none focus:border-[#182A47] transition-colors"
            placeholder="ex: 17.5"
            inputMode="decimal"
          />
        </div>
      </div>

      {/* Material + Preço */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-1">Material</label>
          <input
            value={form.material}
            onChange={e => set('material', e.target.value)}
            className="w-full border border-[#182A47]/20 rounded-sm px-3 py-2 text-[0.9rem] outline-none focus:border-[#182A47] transition-colors"
            placeholder="Couro"
          />
        </div>
        <div>
          <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-1">Preço (€) *</label>
          <input
            required
            type="number"
            min="1"
            value={form.price || ''}
            onChange={e => set('price', parseInt(e.target.value) || 0)}
            className="w-full border border-[#182A47]/20 rounded-sm px-3 py-2 text-[0.9rem] outline-none focus:border-[#182A47] transition-colors"
            placeholder="650"
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-1">Descrição</label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          rows={3}
          className="w-full border border-[#182A47]/20 rounded-sm px-3 py-2 text-[0.9rem] outline-none focus:border-[#182A47] transition-colors resize-none"
          placeholder="Estado, características, acessórios incluídos..."
        />
      </div>

      {/* Estado vendida */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.sold}
          onChange={e => set('sold', e.target.checked)}
          className="accent-[#182A47] w-4 h-4"
        />
        <span className="text-[0.88rem]">Marcar como <strong>Vendida</strong></span>
      </label>

      {/* Upload de fotos */}
      <div>
        <label className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-2">Fotos</label>

        {/* Preview das fotos actuais */}
        {form.photos.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {form.photos.map((url, i) => (
              <div key={url} className="relative group w-20 h-20 rounded-sm overflow-hidden border border-[#182A47]/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                {/* Botões de ordem e remover */}
                <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  {i > 0 && (
                    <button type="button" onClick={() => movePhoto(i, i - 1)} className="text-white text-xs bg-white/20 rounded px-1 hover:bg-white/40">←</button>
                  )}
                  {i < form.photos.length - 1 && (
                    <button type="button" onClick={() => movePhoto(i, i + 1)} className="text-white text-xs bg-white/20 rounded px-1 hover:bg-white/40">→</button>
                  )}
                  <button type="button" onClick={() => removePhoto(i)} className="text-white text-xs bg-red-500/80 rounded px-1 hover:bg-red-600">✕</button>
                </div>
                {i === 0 && (
                  <span className="absolute bottom-0 left-0 right-0 text-center text-white text-[0.5rem] font-bold bg-black/50 py-[2px]">PRINCIPAL</span>
                )}
              </div>
            ))}
          </div>
        )}

        <label className={`flex items-center justify-center gap-2 border-2 border-dashed border-[#182A47]/20 rounded-sm px-4 py-6 cursor-pointer hover:border-[#182A47]/40 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <span className="text-[0.82rem] opacity-50">{uploading ? 'A fazer upload...' : 'Clica para adicionar fotos'}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
        </label>

        {uploadError && (
          <p className="mt-2 text-[0.78rem] text-red-600">{uploadError}</p>
        )}
        <p className="mt-1 text-[0.68rem] opacity-40">JPEG, PNG ou WebP · máx. 10 MB por foto · a primeira foto é a principal</p>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-2 border-t border-[#182A47]/[.08]">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex-1 bg-[#182A47] text-[#FDFFF1] font-bold text-[0.72rem] tracking-[0.15em] uppercase px-6 py-3 rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          {saving ? 'A guardar...' : initial ? 'Guardar Alterações' : 'Adicionar Sela'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-[#182A47]/20 text-[0.72rem] font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[#182A47]/5 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
