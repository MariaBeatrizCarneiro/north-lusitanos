'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Saddle, SaddleInput } from '@/types/saddle'
import SaddleForm from '@/components/admin/SaddleForm'
import { useRouter } from 'next/navigation'

type View = 'list' | 'add' | 'edit'

export default function AdminPage() {
  const [saddles, setSaddles] = useState<Saddle[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>('list')
  const [editing, setEditing] = useState<Saddle | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null)
  const router = useRouter()

  const loadSaddles = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/saddles')
    if (res.ok) setSaddles(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { loadSaddles() }, [loadSaddles])

  const showFeedback = (type: 'ok' | 'err', msg: string) => {
    setFeedback({ type, msg })
    setTimeout(() => setFeedback(null), 4000)
  }

  async function handleAdd(data: SaddleInput) {
    const res = await fetch('/api/saddles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      showFeedback('ok', 'Sela adicionada com sucesso!')
      setView('list')
      loadSaddles()
    } else {
      showFeedback('err', 'Erro ao adicionar a sela.')
    }
  }

  async function handleEdit(data: SaddleInput) {
    if (!editing) return
    const res = await fetch(`/api/saddles/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      showFeedback('ok', 'Sela atualizada com sucesso!')
      setView('list')
      setEditing(null)
      loadSaddles()
    } else {
      showFeedback('err', 'Erro ao atualizar a sela.')
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/saddles/${id}`, { method: 'DELETE' })
    if (res.ok || res.status === 204) {
      showFeedback('ok', 'Sela eliminada.')
      setDeleteConfirm(null)
      loadSaddles()
    } else {
      showFeedback('err', 'Erro ao eliminar a sela.')
    }
  }



  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#FDFFF1]">
      {/* Header */}
      <header className="bg-[#182A47] px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#FDFFF1] text-[0.85rem] font-bold tracking-[0.12em] uppercase">North Lusitanos</span>
          <span className="hidden sm:inline text-[#FDFFF1]/30 text-[0.7rem]">·</span>
          <span className="hidden sm:inline text-[#FDFFF1]/50 text-[0.72rem] tracking-[0.08em] uppercase">Gestão</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-[#FDFFF1]/50 text-[0.68rem] hover:text-[#FDFFF1] transition-colors tracking-[0.1em] uppercase">Ver Site ↗</a>
          <button onClick={handleLogout} className="text-[#FDFFF1]/50 text-[0.68rem] hover:text-[#FDFFF1] transition-colors tracking-[0.1em] uppercase">Sair</button>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 px-4 py-3 rounded-sm text-[0.82rem] font-medium ${feedback.type === 'ok' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {feedback.msg}
          </div>
        )}

        {/* Add / Edit form */}
        {(view === 'add' || view === 'edit') && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => { setView('list'); setEditing(null) }} className="text-[0.72rem] opacity-50 hover:opacity-100 tracking-[0.1em] uppercase transition-opacity">← Voltar</button>
              <h1 className="text-[1.4rem] font-bold">{view === 'add' ? 'Nova Sela' : 'Editar Sela'}</h1>
            </div>
            <div className="bg-white border border-[#182A47]/[.1] rounded-sm p-4 sm:p-8">
              <SaddleForm
                initial={editing ?? undefined}
                onSave={view === 'add' ? handleAdd : handleEdit}
                onCancel={() => { setView('list'); setEditing(null) }}
              />
            </div>
          </div>
        )}

        {/* List view */}
        {view === 'list' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[1.6rem] font-bold">Selas</h1>
                <p className="text-[0.82rem] opacity-50 mt-1">{saddles.length} sela{saddles.length !== 1 ? 's' : ''} no catálogo</p>
              </div>
              <button
                onClick={() => setView('add')}
                className="bg-[#182A47] text-[#FDFFF1] font-bold text-[0.72rem] tracking-[0.15em] uppercase px-5 py-3 rounded-sm hover:opacity-85 transition-opacity flex items-center gap-2"
              >
                <span className="text-lg leading-none">+</span> Nova Sela
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20 opacity-30 text-[0.88rem]">A carregar...</div>
            ) : saddles.length === 0 ? (
              <div className="text-center py-20 opacity-30 text-[0.88rem]">Nenhuma sela no catálogo. Adiciona a primeira!</div>
            ) : (
              <div className="flex flex-col gap-3">
                {saddles.map(saddle => (
                  <div
                    key={saddle.id}
                    className={`bg-white border border-[#182A47]/[.1] rounded-sm p-4 flex flex-wrap items-center gap-4 ${saddle.sold ? 'opacity-60' : ''}`}
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-sm overflow-hidden bg-[#FDFFF1] flex-shrink-0 border border-[#182A47]/[.08]">
                      {saddle.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={saddle.photos[0]} alt={saddle.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20 text-[0.6rem]">Sem foto</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-[0.95rem] truncate">{saddle.name}</p>
                        {saddle.sold && (
                          <span className="text-[0.55rem] font-bold tracking-[0.15em] uppercase bg-[#182A47]/10 text-[#182A47] px-2 py-[2px] rounded-sm">Vendida</span>
                        )}
                      </div>
                      <p className="text-[0.75rem] opacity-45 mt-[2px] capitalize">{saddle.type} · {saddle.size.replace(/"/g, '')}&quot; · {saddle.price}€</p>
                    </div>

                    {/* Acções */}
                    <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                      <button
                        onClick={() => { setEditing(saddle); setView('edit') }}
                        title="Editar"
                        className="w-9 h-9 flex items-center justify-center rounded-sm border border-[#182A47]/20 text-[#182A47] hover:bg-[#182A47]/5 transition-colors"
                      >
                        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(saddle.id)}
                        title="Eliminar"
                        className="w-9 h-9 flex items-center justify-center rounded-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Confirm delete dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-[#182A47]/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-sm max-w-[360px] w-full p-8 shadow-[0_24px_80px_rgba(24,42,71,.25)]">
            <h2 className="font-bold text-[1.05rem] mb-2">Eliminar sela?</h2>
            <p className="text-[0.82rem] opacity-55 mb-6 leading-[1.65]">Esta ação é permanente. As fotos também serão eliminadas do servidor.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white font-bold text-[0.72rem] tracking-[0.12em] uppercase py-3 rounded-sm hover:bg-red-700 transition-colors"
              >
                Sim, eliminar
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-[#182A47]/20 font-bold text-[0.72rem] tracking-[0.12em] uppercase py-3 rounded-sm hover:bg-[#182A47]/5 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
