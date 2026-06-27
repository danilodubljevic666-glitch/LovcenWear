import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0 })} className="flex items-center">
            <img src="/logo.PNG" alt="LovcenWear Logo" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" onClick={() => window.scrollTo({ top: 0 })} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase">
              Home
            </Link>
            <a href="/#majice" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase">
              Majice
            </a>
            <a href="/#kontakt" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase">
              Kontakt
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <Link to="/korpa" className="relative text-white/80 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-48' : 'max-h-0'}`}>
        <div className="px-4 pb-4 flex flex-col gap-4 bg-black">
          <Link to="/" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0 }) }} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase py-1">
            Home
          </Link>
          <a href="/#majice" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase py-1">
            Majice
          </a>
          <a href="/#kontakt" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase py-1">
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  )
}
