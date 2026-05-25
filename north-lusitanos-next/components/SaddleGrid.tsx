'use client'

import { useState, useMemo } from 'react'
import type { Saddle, SaddleType } from '@/types/saddle'
import SaddleCard from './SaddleCard'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

export default function SaddleGrid({ saddles }: { saddles: Saddle[] }) {
  const [types, setTypes] = useState<Set<SaddleType>>(new Set(['dressage', 'salto']))
  const [states, setStates] = useState<Set<string>>(new Set(['available', 'sold']))
  const [sort, setSort] = useState<SortOption>('default')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const toggleType = (t: SaddleType) => {
    setTypes(prev => {
      const next = new Set(prev)
      if (next.has(t)) { next.delete(t) } else { next.add(t) }
      return next
    })
  }
  const toggleState = (s: string) => {
    setStates(prev => {
      const next = new Set(prev)
      if (next.has(s)) { next.delete(s) } else { next.add(s) }
      return next
    })
  }

  const filtered = useMemo(() => {
    return saddles
      .filter(s => types.has(s.type))
      .filter(s => states.has(s.sold ? 'sold' : 'available'))
      .sort((a, b) => {
        if (a.sold !== b.sold) return a.sold ? 1 : -1
        if (sort === 'price-asc')  return a.price - b.price
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'name-asc')   return a.name.localeCompare(b.name, 'pt')
        if (sort === 'name-desc')  return b.name.localeCompare(a.name, 'pt')
        return 0
      })
  }, [saddles, types, states, sort])

  const activeFilters = (types.size < 2 ? 1 : 0) + (states.size < 2 ? 1 : 0)

  const sortLabels: Record<SortOption, string> = {
    default: 'Ordenar',
    'price-asc': 'Preço ↑',
    'price-desc': 'Preço ↓',
    'name-asc': 'Nome A–Z',
    'name-desc': 'Nome Z–A',
  }

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        {/* Filtros */}
        <div className="relative">
          <button
            onClick={() => { setFilterOpen(v => !v); setSortOpen(false) }}
            className={`flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.12em] uppercase border border-[#182A47]/[.18] px-4 py-[0.6rem] rounded-sm transition-all duration-150 ${filterOpen ? 'bg-[#182A47] text-[#FDFFF1] border-[#182A47]' : 'text-[#182A47] hover:bg-[#182A47] hover:text-[#FDFFF1] hover:border-[#182A47]'}`}
          >
            Filtros
            {activeFilters > 0 && (
              <span className={`text-[0.55rem] font-bold w-4 h-4 rounded-full flex items-center justify-center ${filterOpen ? 'bg-white/20 text-[#FDFFF1]' : 'bg-[#182A47] text-[#FDFFF1]'}`}>
                {activeFilters}
              </span>
            )}
            <svg className={`w-3 h-3 transition-transform duration-150 ${filterOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {filterOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-[#182A47]/[.12] rounded-sm shadow-[0_8px_32px_rgba(24,42,71,.1)] p-4 min-w-[180px] z-50">
              <p className="text-[0.58rem] font-bold tracking-[0.18em] uppercase opacity-40 mb-3">Tipo</p>
              {(['dressage', 'salto'] as SaddleType[]).map(t => (
                <label key={t} className="flex items-center gap-2 text-[0.78rem] mb-2 cursor-pointer capitalize">
                  <input type="checkbox" checked={types.has(t)} onChange={() => toggleType(t)} className="accent-[#182A47] w-[13px] h-[13px]" />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </label>
              ))}
              <div className="h-px bg-[#182A47]/10 my-3" />
              <p className="text-[0.58rem] font-bold tracking-[0.18em] uppercase opacity-40 mb-3">Estado</p>
              {[{ key: 'available', label: 'Disponível' }, { key: 'sold', label: 'Vendida' }].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-[0.78rem] mb-2 cursor-pointer">
                  <input type="checkbox" checked={states.has(key)} onChange={() => toggleState(key)} className="accent-[#182A47] w-[13px] h-[13px]" />
                  {label}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Ordenar */}
        <div className="relative">
          <button
            onClick={() => { setSortOpen(v => !v); setFilterOpen(false) }}
            className={`flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.12em] uppercase border border-[#182A47]/[.18] px-4 py-[0.6rem] rounded-sm transition-all duration-150 ${sortOpen ? 'bg-[#182A47] text-[#FDFFF1] border-[#182A47]' : 'text-[#182A47] hover:bg-[#182A47] hover:text-[#FDFFF1] hover:border-[#182A47]'}`}
          >
            {sortLabels[sort]}
            <svg className={`w-3 h-3 transition-transform duration-150 ${sortOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {sortOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-[#182A47]/[.12] rounded-sm shadow-[0_8px_32px_rgba(24,42,71,.1)] p-1 min-w-[160px] z-50">
              {(Object.keys(sortLabels) as SortOption[]).map(opt => (
                <button
                  key={opt}
                  onClick={() => { setSort(opt); setSortOpen(false) }}
                  className={`block w-full text-left text-[0.78rem] px-3 py-[0.55rem] rounded-sm transition-colors ${sort === opt ? 'bg-[#182A47]/[.06] font-bold' : 'hover:bg-[#182A47]/[.04]'}`}
                >
                  {sortLabels[opt]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-[0.88rem] opacity-40 text-center py-16">Nenhuma sela encontrada com estes filtros.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {filtered.map(saddle => (
            <SaddleCard key={saddle.id} saddle={saddle} />
          ))}
        </div>
      )}
    </>
  )
}
