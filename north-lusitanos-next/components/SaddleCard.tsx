'use client'

import { useState, useCallback } from 'react'
import type { Saddle } from '@/types/saddle'
import PhotoLightbox from './PhotoLightbox'
import InterestModal from './InterestModal'

export default function SaddleCard({ saddle }: { saddle: Saddle }) {
  const [photoIdx, setPhotoIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIdx(i => (i - 1 + saddle.photos.length) % saddle.photos.length)
  }, [saddle.photos.length])

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoIdx(i => (i + 1) % saddle.photos.length)
  }, [saddle.photos.length])

  const openLightbox = () => {
    setLightboxIdx(photoIdx)
    setLightboxOpen(true)
  }

  const isSold = saddle.sold

  return (
    <>
      <div
        className={`border border-[#182A47]/[.12] rounded-sm overflow-hidden bg-white flex flex-col transition-[border-color,box-shadow] duration-200 hover:border-[#182A47]/20 hover:shadow-[0_4px_24px_rgba(24,42,71,.07)]${isSold ? ' opacity-70' : ''}`}
      >
        {/* Foto */}
        <div
          className="bg-[#FDFFF1] aspect-[4/3] flex items-center justify-center relative border-b border-[#182A47]/[.12] overflow-hidden cursor-pointer group"
          onClick={openLightbox}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={saddle.photos[photoIdx]}
            alt={saddle.name}
          />

          {/* Sold overlay */}
          {isSold && (
            <div className="absolute inset-0 bg-[rgba(24,42,71,.55)] flex items-center justify-center z-10">
              <span className="text-[#FDFFF1] text-[0.75rem] font-bold tracking-[0.25em] uppercase">Vendida</span>
            </div>
          )}

          {/* Carousel controls */}
          {saddle.photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="carousel-btn absolute left-2 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/88 flex items-center justify-center z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm text-[#182A47] text-lg leading-none"
                aria-label="Foto anterior"
              >‹</button>
              <button
                onClick={next}
                className="carousel-btn absolute right-2 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/88 flex items-center justify-center z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm text-[#182A47] text-lg leading-none"
                aria-label="Próxima foto"
              >›</button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-[5px] z-20">
                {saddle.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={e => { e.stopPropagation(); setPhotoIdx(i) }}
                    className={`w-[5px] h-[5px] rounded-full transition-colors ${i === photoIdx ? 'bg-white' : 'bg-white/40'}`}
                    aria-label={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col gap-2 px-5 pt-5 pb-3">
          <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase opacity-[.38] capitalize">{saddle.type}</p>
          <h3 className="text-[1rem] font-bold leading-[1.25]">{saddle.name}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-[0.72rem] opacity-[.45]">Tam. <strong>{saddle.size.replace(/"/g, '')}"</strong></span>
            <span className="text-[0.72rem] opacity-[.45]">{saddle.material}</span>
          </div>
          {saddle.description && (
            <p className="text-[0.78rem] opacity-50 leading-[1.6] mt-[0.15rem]">{saddle.description}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[#182A47]/[.12]">
          <p className="text-[1.4rem] font-bold">
            <span className="text-[0.85rem] opacity-50 mr-[0.1rem]">{saddle.price}€</span>
          </p>
          <button
            onClick={() => !isSold && setModalOpen(true)}
            disabled={isSold}
            className="text-[0.63rem] font-bold tracking-[0.15em] uppercase bg-[#182A47] text-[#FDFFF1] border-0 px-4 py-[0.55rem] rounded-sm cursor-pointer whitespace-nowrap hover:opacity-75 transition-opacity duration-200 disabled:opacity-30 disabled:cursor-default"
          >
            Tenho Interesse
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <PhotoLightbox
          photos={saddle.photos}
          name={saddle.name}
          initialIdx={lightboxIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {modalOpen && (
        <InterestModal saddle={saddle} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
