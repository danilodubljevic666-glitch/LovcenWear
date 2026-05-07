import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, sizes, ORIGINAL_PRICE } from '../data/products'
import { useCart } from '../context/CartContext'

function isLight(colorName) {
  const name = colorName.toLowerCase()
  return name.includes('bijel') || name.includes('white') || name.includes('bela')
}

function Toast({ message, onDone }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-800 border border-white/10 text-white text-sm px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3 animate-fade-in"
      onAnimationEnd={onDone}
    >
      <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addItem } = useCart()

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [xsOpen, setXsOpen] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [toast, setToast] = useState(null)
  const [addRukav, setAddRukav] = useState(false)
  const [prezimeRukav, setPrezimeRukav] = useState('')
  const [prezimeRukavError, setPrezimeRukavError] = useState(false)
  const [addLedjima, setAddLedjima] = useState(false)
  const [prezimeLedjima, setPrezimeLedjima] = useState('')
  const [prezimeLedjimaError, setPrezimeLedjimaError] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <p className="text-white/50 text-lg">Majica nije pronađena.</p>
        <Link to="/" className="text-yellow-500 hover:underline text-sm">← Nazad na početnu</Link>
      </div>
    )
  }

  const color = product.colors[selectedColor]
  const imgSrc = `/majice/${product.folder}/${color.file}`
  const lightShirt = isLight(color.name)

  // Dynamic background: dark bg for light shirts, light bg for dark shirts
  const imgBg = lightShirt ? 'bg-zinc-700' : 'bg-zinc-200'

  const noChildSizes = !!product.noChildSizes
  const noBackText = !!product.noBackText
  const displayOriginalPrice = product.originalPrice ?? ORIGINAL_PRICE

  const customization = (() => {
    const c = {}
    if (addRukav && prezimeRukav.trim()) c.prezimeRukav = prezimeRukav.trim()
    if (addLedjima && prezimeLedjima.trim()) c.prezimeLedjima = prezimeLedjima.trim()
    return Object.keys(c).length > 0 ? c : null
  })()

  const validateCustomization = () => {
    let valid = true
    if (addRukav && !prezimeRukav.trim()) { setPrezimeRukavError(true); valid = false }
    if (addLedjima && !prezimeLedjima.trim()) { setPrezimeLedjimaError(true); valid = false }
    return valid
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    if (!validateCustomization()) return
    addItem(product, color, selectedSize, customization)
    setToast(`${product.name} dodan u korpu!`)
    setTimeout(() => setToast(null), 2500)
  }

  const handleBuyNow = () => {
    if (!selectedSize) return
    if (!validateCustomization()) return
    addItem(product, color, selectedSize, customization)
    navigate('/korpa')
  }

  return (
    <div className="min-h-screen bg-black">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Navbar mini */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-white/10 h-16 flex items-center px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Nazad
        </Link>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src="/logo.PNG" alt="LovcenWear" className="h-10 w-auto object-contain" />
        </Link>
        <Link to="/korpa" className="ml-auto relative text-white/60 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </Link>
      </div>

      {/* Content */}
      <div className="pt-16 min-h-screen flex flex-col lg:flex-row">

        {/* Image panel — dynamic bg */}
        <div className={`lg:w-1/2 ${imgBg} flex items-center justify-center ${product.id === 'polo-premium-majica' ? 'p-4 sm:p-8' : 'p-8 sm:p-16'} min-h-[50vh] lg:min-h-screen lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] transition-colors duration-300`}>
          <div className="relative w-full max-w-sm">
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-black/20 border-t-black/60 rounded-full animate-spin" />
              </div>
            )}
            <img
              key={imgSrc}
              src={imgSrc}
              alt={`${product.name} - ${color.name}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              className={`w-full h-auto object-contain transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </div>

        {/* Options panel */}
        <div className="lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 gap-10">

          {/* Name & price */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">LovcenWear</p>
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ fontFamily: "'Raleway', sans-serif" }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-white/40 text-lg line-through">{displayOriginalPrice.toFixed(2)}€</span>
              <span className="text-yellow-500 text-2xl font-bold">{product.price.toFixed(2)}€</span>
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                -{Math.round((1 - product.price / displayOriginalPrice) * 100)}%
              </span>
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
              Boja — <span className="text-white">{color.name}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c, i) => {
                const light = isLight(c.name)
                return (
                  <button
                    key={i}
                    onClick={() => { setSelectedColor(i); setImgLoaded(false) }}
                    title={c.name}
                    className={`relative w-14 h-14 rounded-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer ${light ? 'bg-zinc-600' : 'bg-zinc-200'}`}
                    style={{
                      borderColor: selectedColor === i ? '#D4AF37' : 'transparent',
                      outline: selectedColor === i ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <img src={`/majice/${product.folder}/${c.file}`} alt={c.name} className="w-full h-full object-cover" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
              Veličina {selectedSize ? <span className="text-white">— {selectedSize}</span> : <span className="text-white/30">(izaberi)</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const isXs = size === 'XS'
                if (isXs && noChildSizes) return null
                const isActive = isXs
                  ? (xsOpen || selectedSize?.startsWith('Dječija'))
                  : selectedSize === size
                return (
                  <button
                    key={size}
                    onClick={() => {
                      if (isXs) {
                        setXsOpen(true)
                        setSelectedSize(null)
                      } else {
                        setSelectedSize(size)
                        setXsOpen(false)
                      }
                    }}
                    className={`w-14 h-14 text-sm font-semibold border transition-all duration-200 cursor-pointer rounded-sm
                      ${isActive
                        ? 'bg-yellow-500 border-yellow-500 text-black'
                        : 'bg-transparent border-white/20 text-white/70 hover:border-white hover:text-white'
                      }`}
                  >
                    {isXs ? 'Dječije' : size}
                  </button>
                )
              })}
            </div>

            {/* Child age picker */}
            {xsOpen && !noChildSizes && (
              <div className="mt-4">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Uzrast djeteta</p>
                <div className="flex flex-wrap gap-2">
                  {[3,4,5,6,7,8,9,10,11,12,13,14].map((age) => {
                    const val = `Dječija (${age} god.)`
                    return (
                      <button
                        key={age}
                        onClick={() => { setSelectedSize(val); setXsOpen(false) }}
                        className={`px-3 h-10 text-sm font-semibold border transition-all duration-200 cursor-pointer rounded-sm
                          ${selectedSize === val
                            ? 'bg-yellow-500 border-yellow-500 text-black'
                            : 'bg-transparent border-white/20 text-white/70 hover:border-white hover:text-white'
                          }`}
                      >
                        {age} god.
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Customization */}
          <div className="flex flex-col gap-4">
            <p className="text-white/40 text-xs uppercase tracking-widest">Personalizacija</p>

            {/* Prezime na leđima — sve majice osim onih sa noBackText */}
            {!noBackText && <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => { setAddLedjima((v) => !v); setPrezimeLedjimaError(false); setPrezimeLedjima('') }}
                  className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer
                    ${addLedjima ? 'bg-yellow-500 border-yellow-500' : 'bg-transparent border-white/30 group-hover:border-white/60'}`}
                >
                  {addLedjima && (
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-white/70 text-sm select-none"
                  onClick={() => { setAddLedjima((v) => !v); setPrezimeLedjimaError(false); setPrezimeLedjima('') }}
                >
                  Dodajte prezime (ili ime) na leđima majice
                  <span className="text-yellow-500 font-semibold ml-1">+3€</span>
                </span>
              </label>
              {addLedjima && (
                <div>
                  <input
                    type="text"
                    value={prezimeLedjima}
                    onChange={(e) => { setPrezimeLedjima(e.target.value); setPrezimeLedjimaError(false) }}
                    placeholder="Unesite prezime"
                    className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm
                      ${prezimeLedjimaError ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {prezimeLedjimaError && <p className="text-red-400 text-xs mt-1">Unesite prezime ili uklonite kvačicu</p>}
                </div>
              )}
            </div>}

            {/* Prezime na rukavu — sve majice */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => { setAddRukav((v) => !v); setPrezimeRukavError(false); setPrezimeRukav('') }}
                  className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer
                    ${addRukav ? 'bg-yellow-500 border-yellow-500' : 'bg-transparent border-white/30 group-hover:border-white/60'}`}
                >
                  {addRukav && (
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-white/70 text-sm select-none"
                  onClick={() => { setAddRukav((v) => !v); setPrezimeRukavError(false); setPrezimeRukav('') }}
                >
                  Dodajte prezime (ili ime) na rukav majice
                  <span className="text-yellow-500 font-semibold ml-1">+3€</span>
                </span>
              </label>
              {addRukav && (
                <div>
                  <input
                    type="text"
                    value={prezimeRukav}
                    onChange={(e) => { setPrezimeRukav(e.target.value); setPrezimeRukavError(false) }}
                    placeholder="Unesite prezime"
                    className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm
                      ${prezimeRukavError ? 'border-red-500' : 'border-white/20'}`}
                  />
                  {prezimeRukavError && <p className="text-red-400 text-xs mt-1">Unesite prezime ili uklonite kvačicu</p>}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className={`w-full py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm
                ${selectedSize ? 'bg-white text-black hover:bg-yellow-500 cursor-pointer' : 'bg-zinc-800 text-white/30 cursor-not-allowed'}`}
            >
              Naruči odmah
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-4 text-sm font-semibold uppercase tracking-widest border transition-all duration-300 rounded-sm
                ${selectedSize ? 'border-white/30 text-white hover:border-yellow-500 hover:text-yellow-500 cursor-pointer' : 'border-white/10 text-white/20 cursor-not-allowed'}`}
            >
              Dodaj u korpu
            </button>
            {!selectedSize && (
              <p className="text-white/25 text-xs text-center">Izaberi veličinu da bi mogao naručiti</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
