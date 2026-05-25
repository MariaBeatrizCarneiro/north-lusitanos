'use client'

import type { Saddle } from '@/types/saddle'

const WA_NUMBER = '351913615196'
const IG_HANDLE = 'northlusitanosstore'
const EMAIL = 'guilherme.areal10@gmail.com'

export default function InterestModal({ saddle, onClose }: { saddle: Saddle; onClose: () => void }) {
  const waText = encodeURIComponent(`Olá! Tenho interesse na sela ${saddle.name} do North Lusitanos.`)
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`
  const emailSubject = encodeURIComponent(`Interesse na sela ${saddle.name}`)

  return (
    <div
      className="fixed inset-0 bg-[#182A47]/45 z-[200] p-6 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-sm max-w-[400px] w-full overflow-hidden shadow-[0_24px_80px_rgba(24,42,71,.25)]"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-[#182A47] px-7 py-6 text-[#FDFFF1]">
          <p className="text-[0.58rem] font-bold tracking-[0.25em] uppercase opacity-[.45] mb-[0.4rem]">Tenho Interesse</p>
          <p className="text-[1.05rem] font-bold">{saddle.name}</p>
        </div>
        <div className="p-7">
          <p className="text-[0.82rem] opacity-[.55] leading-[1.65] mb-6">
            Escolhe como preferes contactar-nos. Menciona o nome da sela na tua mensagem.
          </p>
          <div className="flex flex-col gap-[0.65rem]">
            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[0.9rem] px-4 py-[0.85rem] border border-[#182A47]/[.12] rounded-sm text-[0.82rem] font-bold text-[#182A47] hover:border-[#182A47] hover:bg-[#FDFFF1] transition-[border-color,background] duration-[180ms]"
            >
              <div className="w-[34px] h-[34px] rounded-full bg-[rgba(37,211,102,.14)] flex items-center justify-center flex-shrink-0">
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <strong className="block text-[0.85rem]">WhatsApp</strong>
                <span className="text-[0.68rem] opacity-[.45] font-normal">+351 913 615 196</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={`https://www.instagram.com/${IG_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[0.9rem] px-4 py-[0.85rem] border border-[#182A47]/[.12] rounded-sm text-[0.82rem] font-bold text-[#182A47] hover:border-[#182A47] hover:bg-[#FDFFF1] transition-[border-color,background] duration-[180ms]"
            >
              <div className="w-[34px] h-[34px] rounded-full bg-[#182A47]/[.08] flex items-center justify-center flex-shrink-0">
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </div>
              <div>
                <strong className="block text-[0.85rem]">Instagram</strong>
                <span className="text-[0.68rem] opacity-[.45] font-normal">@{IG_HANDLE}</span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}?subject=${emailSubject}`}
              className="flex items-center gap-[0.9rem] px-4 py-[0.85rem] border border-[#182A47]/[.12] rounded-sm text-[0.82rem] font-bold text-[#182A47] hover:border-[#182A47] hover:bg-[#FDFFF1] transition-[border-color,background] duration-[180ms]"
            >
              <div className="w-[34px] h-[34px] rounded-full bg-[#182A47]/[.08] flex items-center justify-center flex-shrink-0">
                <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <strong className="block text-[0.85rem]">Email</strong>
                <span className="text-[0.68rem] opacity-[.45] font-normal">{EMAIL}</span>
              </div>
            </a>
          </div>

          <button
            onClick={onClose}
            className="block mt-5 w-full text-[0.63rem] font-bold tracking-[0.15em] uppercase bg-transparent border border-[#182A47]/[.12] text-[#182A47] px-4 py-[0.65rem] rounded-sm cursor-pointer opacity-[.45] hover:opacity-100 transition-opacity duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
