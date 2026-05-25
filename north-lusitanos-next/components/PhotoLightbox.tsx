'use client'

import { useEffect, useState, useCallback } from 'react'

interface PhotoLightboxProps {
  photos: string[]
  name: string
  initialIdx: number
  onClose: () => void
}

export default function PhotoLightbox({ photos, name, initialIdx, onClose }: PhotoLightboxProps) {
  const [idx, setIdx] = useState(initialIdx)

  const prev = useCallback(() => setIdx(i => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, prev, next])

  return (
    <div
      className="fixed inset-0 bg-black/[.88] z-[300] backdrop-blur-[2px] flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white border-0 cursor-pointer z-20 transition-colors text-[1.1rem] leading-none"
      >✕</button>

      {photos.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-[1.8rem] border-0 cursor-pointer z-20 transition-colors leading-none"
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Próxima foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-[1.8rem] border-0 cursor-pointer z-20 transition-colors leading-none"
          >›</button>
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photos[idx]}
        alt={name}
        onClick={e => e.stopPropagation()}
        className="max-w-[min(90vw,1000px)] max-h-[85vh] object-contain rounded-sm select-none z-10"
      />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[0.3rem] pointer-events-none z-20">
        <span className="text-white/40 text-[0.58rem] font-bold tracking-[0.22em] uppercase">{name}</span>
        {photos.length > 1 && (
          <span className="text-white/25 text-[0.58rem] tracking-[0.08em]">{idx + 1} / {photos.length}</span>
        )}
      </div>
    </div>
  )
}
