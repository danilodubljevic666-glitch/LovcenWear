import { useEffect, useState } from 'react'

const heroShirts = [
  { src: '/majice/20 godina premium majica/20 godina crvena.png', alt: '20 godina premium majica', direction: 'left',  imgScale: 'scale-[0.935] lg:translate-y-[30px]' },
  { src: '/majice/Premium majica/crvena premium.png',           alt: 'Premium majica',           direction: 'right', imgScale: '' },
]

const titleStyle = {
  fontFamily: "'Raleway', sans-serif",
  WebkitTextStroke: '2px rgba(255,255,255,0.6)',
  textShadow: '0 0 80px rgba(255,255,255,0.25), 0 0 30px rgba(255,255,255,0.15), 0 6px 40px rgba(0,0,0,1)',
}

const wearStyle = {
  color: '#D4AF37',
  WebkitTextStroke: '2px rgba(212,175,55,0.8)',
  textShadow: '0 0 60px rgba(212,175,55,0.7), 0 0 120px rgba(212,175,55,0.3), 0 6px 40px rgba(0,0,0,1)',
}

export default function Hero({ ready = false }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [ready])

  const fadeUp = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 1s ease, transform 1s ease`,
    transitionDelay: delay,
  })

  const slideIn = (direction) => ({
    transform: visible
      ? 'translateX(0) rotate(0deg)'
      : direction === 'left' ? 'translateX(-120%) rotate(-10deg)' : 'translateX(120%) rotate(10deg)',
    opacity: visible ? 1 : 0,
    transition: 'transform 1s ease, opacity 1s ease',
  })

  return (
    <section
      id="home"
      className="min-h-screen bg-black relative overflow-hidden pt-16"
    >
      {/* Radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#000_70%)]" />

      {/* ── MOBILE / TABLET layout (hidden on lg+) ── */}
      <div className="lg:hidden flex flex-col min-h-[calc(100vh-4rem)]">

        {/* Title — top */}
        <div className="relative z-10 text-center px-4 pt-16 pb-2">
          <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.25em] mb-3"
            style={fadeUp('0ms')}>
            Dobrodošli na
          </p>
          <h1
            className="text-white text-5xl sm:text-7xl font-bold tracking-tight leading-none"
            style={{ ...titleStyle, ...fadeUp('0ms') }}
          >
            Lovćen <span style={wearStyle}>Wear</span>
          </h1>
          <img
            src="/natpis.PNG"
            alt="Ponos u svakom šavu"
            className="mt-[30px] h-20 sm:h-28 w-auto object-contain mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            style={fadeUp('300ms')}
          />
        </div>

        {/* Shirts — middle, take remaining space */}
        <div className="relative flex-1 flex items-end justify-between px-2">
          {heroShirts.map((shirt) => (
            <div key={shirt.alt} style={slideIn(shirt.direction)}>
              <img
                src={shirt.src}
                alt={shirt.alt}
                className={`h-[46vh] sm:h-[55vh] w-auto object-contain ${shirt.imgScale}`}
              />
            </div>
          ))}
        </div>

        {/* CTA — bottom */}
        <div className="relative z-10 text-center pb-20" style={fadeUp('600ms')}>
          <a
            href="#majice"
            className="inline-block bg-white text-black text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-yellow-600 hover:text-white transition-colors duration-300 rounded-[10px]"
          >
            Pogledaj kolekciju
          </a>
        </div>
      </div>

      {/* ── DESKTOP layout (hidden on mobile/tablet) ── */}
      <div className="hidden lg:flex min-h-[calc(100vh-4rem)] items-center justify-center">

        {/* Shirts — absolute background */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          {heroShirts.map((shirt) => (
            <div key={shirt.alt} style={slideIn(shirt.direction)}>
              <img
                src={shirt.src}
                alt={shirt.alt}
                className={`h-[80vh] w-auto object-contain ${shirt.imgScale}`}
              />
            </div>
          ))}
        </div>

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 gap-6">
          <p className="text-white/50 text-sm uppercase tracking-[0.25em] -mb-4"
            style={fadeUp('100ms')}>
            Dobrodošli na
          </p>
          <h1
            className="text-white text-8xl xl:text-9xl font-bold tracking-tight leading-none"
            style={{ ...titleStyle, ...fadeUp('200ms') }}
          >
            Lovćen <span style={wearStyle}>Wear</span>
          </h1>
          <img
            src="/natpis.PNG"
            alt="Ponos u svakom šavu"
            className="h-36 md:h-44 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
            style={fadeUp('500ms')}
          />
          <div style={fadeUp('800ms')}>
            <a
              href="#majice"
              className="inline-block bg-white text-black text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-yellow-600 hover:text-white transition-colors duration-300 rounded-[10px]"
            >
              Pogledaj kolekciju
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-30">
        <div className="w-px h-8 bg-white animate-bounce" />
      </div>
    </section>
  )
}
