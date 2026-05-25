'use client'

import React, { useState } from 'react'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#selas', label: 'Selas' },
    { href: '#como-comprar', label: 'Como Comprar' },
    { href: '#contactos', label: 'Contactos' },
  ]

  return (
    <header className="sticky top-0 z-[100] bg-[#182A47] border-b border-[#FDFFF1]/[.08]">
      <nav className="flex items-center justify-between px-4 sm:px-8 h-16 max-w-[1100px] mx-auto w-full">
        <a href="#" className="flex-shrink-0">
          <span className="text-[#FDFFF1] text-[0.85rem] font-bold tracking-[0.12em] uppercase">North Lusitanos</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-0 list-none">
          {links.map((l, i) => (
            <React.Fragment key={l.href}>
              {i > 0 && <li className="w-px h-3 bg-[#FDFFF1] opacity-20" />}
              <li>
                <a
                  href={l.href}
                  className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#FDFFF1] opacity-50 hover:opacity-100 transition-opacity duration-200 px-5"
                >
                  {l.label}
                </a>
              </li>
            </React.Fragment>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className="sm:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={`block h-[2px] bg-[#FDFFF1] transition-all duration-200 origin-center ${open ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
          <span className={`block w-5 h-[2px] bg-[#FDFFF1] transition-all duration-200 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block h-[2px] bg-[#FDFFF1] transition-all duration-200 origin-center ${open ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`sm:hidden overflow-hidden transition-all duration-200 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <div className="bg-[#182A47] border-t border-[#FDFFF1]/[.08] px-4 pb-3">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#FDFFF1] opacity-60 hover:opacity-100 active:opacity-100 transition-opacity duration-200 py-[0.9rem] border-b border-[#FDFFF1]/[.07] last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
