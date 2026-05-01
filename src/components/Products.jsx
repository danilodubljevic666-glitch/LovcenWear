import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { products, ORIGINAL_PRICE } from '../data/products'

function ProductCard({ product }) {
  const previewColor = product.colors[0]
  const src = `/majice/${product.folder}/${previewColor.file}`

  return (
    <Link
      to={`/majica/${product.id}`}
      className="group cursor-pointer bg-zinc-900 hover:bg-zinc-800 transition-colors duration-300 rounded-sm overflow-hidden block"
    >
      <div className="aspect-square bg-zinc-200 flex items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 z-10">
          Popust
        </div>
        <img
          src={src}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white text-sm sm:text-base font-medium tracking-wide text-center">
          {product.name}
        </h3>
        <div className="flex justify-center gap-1.5 mt-2">
          {product.colors.map((c, i) => (
            <span
              key={i}
              title={c.name}
              className="w-3 h-3 rounded-full border border-white/20 inline-block"
              style={{ backgroundColor: c.swatch }}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-white/40 text-sm line-through">{(product.originalPrice ?? ORIGINAL_PRICE).toFixed(2)}€</span>
          <span className="text-yellow-500 font-semibold text-base">{product.price.toFixed(2)}€</span>
        </div>
      </div>
    </Link>
  )
}

export default function Products() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false)
          requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
        } else {
          setVisible(false)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="majice" className="bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Naša kolekcija
          </h2>
          <div className="w-12 h-0.5 bg-yellow-500 mx-auto mt-4" />
          <p className="text-white/40 mt-4 text-sm tracking-widest uppercase">
            Odaberi svoju majicu
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-col gap-1.5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: visible ? `${index * 60}ms` : '0ms',
              }}
            >
              <ProductCard product={product} />
              {index === 0 && (
                <p className="text-red-500 text-xs font-semibold text-center tracking-wide"
                  style={{ animation: 'pulse 1.5s ease-in-out infinite', textShadow: '0 0 8px rgba(239,68,68,0.8)' }}>
                  🔥 17 prodatih majici u zadnjih 24h
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
