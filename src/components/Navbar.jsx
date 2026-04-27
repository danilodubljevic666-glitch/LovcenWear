import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img
              src="/logo.PNG"
              alt="LovcenWear Logo"
              className="h-16 w-auto object-contain"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase">
              Home
            </a>
            <a href="#majice" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase">
              Majice
            </a>
            <a href="#kontakt" className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase">
              Kontakt
            </a>
          </div>

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

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-48' : 'max-h-0'}`}>
        <div className="px-4 pb-4 flex flex-col gap-4 bg-black">
          <a href="#home" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase py-1">
            Home
          </a>
          <a href="#majice" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase py-1">
            Majice
          </a>
          <a href="#kontakt" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase py-1">
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  )
}
