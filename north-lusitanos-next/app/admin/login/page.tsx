'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const { error: msg } = await res.json()
      setError(msg ?? 'Erro ao fazer login.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFFF1] flex items-center justify-center px-6">
      <div className="w-full max-w-[360px]">
        <div className="text-center mb-10">
          <p className="text-[0.65rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-2">North Lusitanos</p>
          <h1 className="text-[1.6rem] font-bold">Área de Gestão</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[0.72rem] font-bold tracking-[0.12em] uppercase opacity-50 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full border border-[#182A47]/20 rounded-sm px-4 py-3 text-[0.9rem] outline-none focus:border-[#182A47] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[0.78rem] text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#182A47] text-[#FDFFF1] font-bold text-[0.72rem] tracking-[0.15em] uppercase px-6 py-3 rounded-sm hover:opacity-85 transition-opacity disabled:opacity-50"
          >
            {loading ? 'A entrar...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
