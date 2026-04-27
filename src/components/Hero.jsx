import { useEffect, useState } from 'react'

const heroShirts = [
  {
    src: '/majice/Krstas majica/krstas png.png',
    alt: 'Krstas majica',
    direction: 'left',
  },
  {
    src: '/majice/Premium majica/bijela premium.png',
    alt: 'Premium majica',
    direction: 'right',
  },
]

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#000_70%)]" />

      {/* Shirts — background layer */}
      <div className="absolute inset-0 flex items-center justify-between px-0 sm:px-4 pointer-events-none">
        {heroShirts.map((shirt) => (
          <div
            key={shirt.alt}
            className="transition-all duration-1000 ease-out"
            style={{
              transform: visible
                ? 'translateX(0) rotate(0deg)'
                : shirt.direction === 'left'
                ? 'translateX(-120%) rotate(-10deg)'
                : 'translateX(120%) rotate(10deg)',
              opacity: visible ? 0.35 : 0,
            }}
          >
            <img
              src={shirt.src}
              alt={shirt.alt}
              className="h-[70vh] sm:h-[80vh] w-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Centre content — foreground */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">

        <h1
          className="text-white text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-out"
          style={{
            fontFamily: "'Raleway', sans-serif",
            WebkitTextStroke: '2px rgba(255,255,255,0.6)',
            textShadow: '0 0 80px rgba(255,255,255,0.25), 0 0 30px rgba(255,255,255,0.15), 0 6px 40px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,1)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '200ms',
          }}
        >
          Lovćen{' '}
          <span style={{
            color: '#D4AF37',
            WebkitTextStroke: '2px rgba(212,175,55,0.8)',
            textShadow: '0 0 60px rgba(212,175,55,0.7), 0 0 120px rgba(212,175,55,0.3), 0 6px 40px rgba(0,0,0,1)',
          }}>Wear</span>
        </h1>
        <img
          src="/natpis.PNG"
          alt="Ponos u svakom šavu"
          className="mt-6 h-24 sm:h-36 md:h-44 w-auto object-contain mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 0.9 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '500ms',
          }}
        />

        {/* CTA */}
        <div
          className="mt-12 transition-all duration-1000 delay-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <a
            href="#majice"
            className="inline-block bg-white text-black text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-yellow-600 hover:text-white transition-colors duration-300"
          >
            Pogledaj kolekciju
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-40">
        <div className="w-px h-8 bg-white animate-bounce" />
      </div>
    </section>
  )
}
