import { supabase } from '@/lib/supabase'
import type { Saddle } from '@/types/saddle'
import SaddleGrid from '@/components/SaddleGrid'
import NavBar from '@/components/NavBar'

const WA_NUMBER = '351913615196'
const IG_HANDLE = 'northlusitanosstore'
const EMAIL = 'guilherme.areal10@gmail.com'

const MOCK_SADDLES: Saddle[] = [
  { id: '1', name: 'Relvas · Equicouro', type: 'dressage', size: '17.5', material: 'Couro', price: 750, description: 'Sela relvas fabricada na Equicouro. Vendida com loros e estribos à portuguesa.', sold: false, photos: ['/selas/Sela0/0.1.jpeg', '/selas/Sela0/0.2.jpeg', '/selas/Sela0/0.3.jpeg', '/selas/Sela0/0.4.jpeg', '/selas/Sela0/0.5.jpeg'], created_at: '', updated_at: '' },
  { id: '2', name: 'Prestige Archimede', type: 'salto', size: '17', material: 'Couro', price: 575, description: 'Sela de salto italiana em couro castanho. Flaps avançadas, assento confortável. Bom estado geral.', sold: false, photos: ['/selas/Sela1/1.1.jpeg', '/selas/Sela1/1.2.jpeg', '/selas/Sela1/1.3.jpeg'], created_at: '', updated_at: '' },
  { id: '3', name: 'Santa Cruz', type: 'dressage', size: '17.5', material: 'Couro', price: 375, description: 'Sela de dressage em couro preto. Bom estado geral, ideal para uso diário de treino.', sold: false, photos: ['/selas/Sela3/3.1.jpeg', '/selas/Sela3/3.2.jpeg'], created_at: '', updated_at: '' },
  { id: '4', name: 'Zaldi Lustinus', type: 'dressage', size: '17.5', material: 'Couro', price: 675, description: 'Sela de dressage espanhola em couro preto. Detalhes em strass, assento confortável. Muito bom estado.', sold: false, photos: ['/selas/Sela6/6.1.jpeg', '/selas/Sela6/6.2.jpeg', '/selas/Sela6/6.3.jpeg'], created_at: '', updated_at: '' },
  { id: '5', name: 'Bates Innova', type: 'dressage', size: '17.5', material: 'Couro', price: 950, description: 'Dressage em couro preto, muito bem conservada. Flaps longas e assento profundo.', sold: true, photos: ['/selas/Sela2/2.1.jpeg', '/selas/Sela2/2.2.jpeg', '/selas/Sela2/2.3.jpeg'], created_at: '', updated_at: '' },
  { id: '6', name: 'Kentaur Penelopa', type: 'dressage', size: '17.5', material: 'Couro', price: 350, description: 'Sela de dressage Kentaur em couro preto. Acompanha loros e estribos.', sold: true, photos: ['/selas/Sela4/4.1.jpeg', '/selas/Sela4/4.2.jpeg', '/selas/Sela4/4.3.jpeg'], created_at: '', updated_at: '' },
]

async function getSaddles(): Promise<Saddle[]> {
  // Supabase não configurado — usar dados locais para preview
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    return MOCK_SADDLES
  }

  const { data, error } = await supabase
    .from('saddles')
    .select('*')
    .order('sold', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) return []
  return data as Saddle[]
}

export const revalidate = 60

export default async function HomePage() {
  const saddles = await getSaddles()

  return (
    <>
      <NavBar />

      {/* HERO */}
      <section className="bg-[#FDFFF1] min-h-[calc(100vh-4rem)] px-4 sm:px-8 text-[#182A47] flex flex-col items-center justify-center">
        <div className="sm:hidden text-center w-full py-20">
          <p className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40 mb-7">Selas em Segunda Mão · Portugal</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="North Lusitanos" className="h-64 w-64 object-contain opacity-80 mx-auto mb-8" />
          <div className="w-12 h-px bg-[#182A47] opacity-20 mx-auto mb-8" />
          <p className="text-[clamp(0.9rem,2vw,1.05rem)] opacity-50 max-w-[380px] mx-auto mb-10 leading-[1.75]">Selas de qualidade, selecionadas com rigor a preços acessíveis.</p>
          <a href="#selas" className="inline-block bg-[#182A47] text-[#FDFFF1] text-[0.72rem] font-bold tracking-[0.2em] uppercase px-9 py-[0.9rem] rounded-sm hover:opacity-85 transition-opacity duration-200">Ver Selas Disponíveis</a>
        </div>
        <div className="hidden sm:flex items-center justify-between w-full max-w-[1100px] mx-auto gap-16">
          <div className="flex flex-col items-start text-left gap-7 flex-1">
            <p className="text-[0.7rem] font-bold tracking-[0.3em] uppercase opacity-40">Selas em Segunda Mão · Portugal</p>
            <h1 className="text-[clamp(2.4rem,4.5vw,4rem)] font-bold tracking-[0.03em] leading-[1.1]">Dressage &amp;<br />Jumping Saddles</h1>
            <div className="w-12 h-px bg-[#182A47] opacity-20" />
            <p className="text-[clamp(0.9rem,1.4vw,1rem)] opacity-50 max-w-[360px] leading-[1.75]">Selas de qualidade, selecionadas com rigor a preços acessíveis.</p>
            <a href="#selas" className="inline-block bg-[#182A47] text-[#FDFFF1] text-[0.72rem] font-bold tracking-[0.2em] uppercase px-9 py-[0.9rem] rounded-sm hover:opacity-85 transition-opacity duration-200">Ver Selas Disponíveis</a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="North Lusitanos" className="h-[380px] w-[380px] object-contain opacity-80 flex-shrink-0" />
        </div>
      </section>

      {/* SELAS */}
      <div id="selas">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-14 sm:py-[5.5rem]">
          <span className="block text-[0.65rem] font-bold tracking-[0.3em] uppercase opacity-[.35] mb-2">Disponíveis agora</span>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold tracking-[0.02em] mb-[0.6rem]">Selas</h2>
          <p className="text-[0.88rem] opacity-50 max-w-[520px] leading-[1.7] mb-12">Todas as selas são inspecionadas antes de serem listadas. As fotos são do próprio artigo.</p>
          <SaddleGrid saddles={saddles} />
        </div>
      </div>

      {/* COMO COMPRAR */}
      <div id="como-comprar" className="bg-[#FDFFF1] border-t border-b border-[#182A47]/[.12]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-14 sm:py-[5.5rem]">
          <span className="block text-[0.65rem] font-bold tracking-[0.3em] uppercase opacity-[.35] mb-2">Processo simples</span>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold tracking-[0.02em] mb-[0.6rem]">Como Comprar</h2>
          <p className="text-[0.88rem] opacity-50 max-w-[520px] leading-[1.7] mb-12">Sem loja física toda a comunicação é feita online ou por telefone.</p>
          <div className="grid grid-cols-3 gap-10 max-[680px]:grid-cols-1 max-[680px]:gap-8">
            {[
              { n: '01', title: 'Escolhe a Sela', desc: 'Navega pelo catálogo e clica em "Tenho Interesse" na sela que te interessa.' },
              { n: '02', title: 'Entra em Contacto', desc: 'Fala connosco por Instagram, WhatsApp ou email. Enviamos fotos adicionais e mais informações.' },
              { n: '03', title: 'Combinamos a Entrega', desc: 'Enviamos para todo o país por transportadora, ou combinamos entrega em mão. A sela parte após confirmação de pagamento.' },
            ].map(({ n, title, desc }) => (
              <div key={n}>
                <p className="text-[2.75rem] font-bold opacity-10 leading-none mb-3">{n}</p>
                <h3 className="text-[1.05rem] font-bold mb-2">{title}</h3>
                <p className="text-[0.82rem] opacity-50 leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACTOS */}
      <div id="contactos">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-14 sm:py-[5.5rem]">
          <span className="block text-[0.65rem] font-bold tracking-[0.3em] uppercase opacity-[.35] mb-2">Fala connosco</span>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold tracking-[0.02em] mb-[0.6rem]">Contactos</h2>
          <p className="text-[0.88rem] opacity-50 max-w-[520px] leading-[1.7] mb-12">Disponíveis para responder a dúvidas, enviar fotos adicionais ou combinar uma visita. Também compramos selas.</p>
          <div className="grid grid-cols-3 gap-6 max-[680px]:grid-cols-1">
            <a href={`https://www.instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" className="group border border-[#182A47]/[.12] rounded-sm p-8 flex flex-col gap-[0.65rem] hover:border-[#182A47]/25 hover:shadow-[0_4px_20px_rgba(24,42,71,.07)] transition-all duration-200">
              <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center mb-1" style={{ background: 'linear-gradient(135deg,#f9ce34,#ee2a7b,#6228d7)' }}>
                <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
              </div>
              <p className="text-[1rem] font-bold">Instagram</p>
              <p className="text-[0.82rem] opacity-50">@{IG_HANDLE}</p>
              <p className="text-[0.78rem] opacity-[.4] leading-[1.6]">Segue-nos para novidades e envia mensagem direta para qualquer questão.</p>
            </a>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá! Tenho interesse numa sela do North Lusitanos.')}`} target="_blank" rel="noopener noreferrer" className="group border border-[#182A47]/[.12] rounded-sm p-8 flex flex-col gap-[0.65rem] hover:border-[#182A47]/25 hover:shadow-[0_4px_20px_rgba(24,42,71,.07)] transition-all duration-200">
              <div className="w-[46px] h-[46px] rounded-xl bg-[#25D366] flex items-center justify-center mb-1">
                <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <p className="text-[1rem] font-bold">WhatsApp</p>
              <p className="text-[0.82rem] opacity-50">+351 913 615 196</p>
              <p className="text-[0.78rem] opacity-[.4] leading-[1.6]">Envia mensagem e respondemos com fotos, medidas e todas as informações.</p>
            </a>
            <a href={`mailto:${EMAIL}`} className="group border border-[#182A47]/[.12] rounded-sm p-8 flex flex-col gap-[0.65rem] hover:border-[#182A47]/25 hover:shadow-[0_4px_20px_rgba(24,42,71,.07)] transition-all duration-200">
              <div className="w-[46px] h-[46px] rounded-xl bg-[#EA4335] flex items-center justify-center mb-1">
                <svg className="w-[20px] h-[20px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <p className="text-[1rem] font-bold">Email</p>
              <p className="text-[0.82rem] opacity-50">{EMAIL}</p>
              <p className="text-[0.78rem] opacity-[.4] leading-[1.6]">Para questões mais detalhadas ou para receber um catálogo atualizado.</p>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#182A47] text-[#FDFFF1] px-4 sm:px-8 py-6">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <span className="text-[0.68rem] font-bold tracking-[0.1em] opacity-30">© 2026 North Lusitanos</span>
          <div className="flex items-center gap-5">
            <a href={`https://www.instagram.com/${IG_HANDLE}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-30 hover:opacity-80 transition-opacity duration-200">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="opacity-30 hover:opacity-80 transition-opacity duration-200">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="opacity-30 hover:opacity-80 transition-opacity duration-200">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
