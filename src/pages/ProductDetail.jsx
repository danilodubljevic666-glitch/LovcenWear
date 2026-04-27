import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, sizes } from '../data/products'

const WHATSAPP = '38269463403'

function OrderModal({ product, color, size, onClose }) {
  const [form, setForm] = useState({ ime: '', prezime: '', telefon: '', adresa: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.ime.trim()) e.ime = 'Obavezno polje'
    if (!form.prezime.trim()) e.prezime = 'Obavezno polje'
    if (!form.telefon.trim()) e.telefon = 'Obavezno polje'
    if (!form.adresa.trim()) e.adresa = 'Obavezno polje'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }

    const text = encodeURIComponent(
      `Zdravo! Želim da naručim:\n\n` +
      `*Majica:* ${product.name}\n` +
      `*Boja:* ${color.name}\n` +
      `*Veličina:* ${size}\n\n` +
      `*Ime i prezime:* ${form.ime} ${form.prezime}\n` +
      `*Telefon:* ${form.telefon}\n` +
      `*Adresa:* ${form.adresa}`
    )
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-zinc-900 border border-white/10 rounded-sm w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-base tracking-wide">Podaci za narudžbu</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Order summary */}
        <div className="px-6 py-4 bg-zinc-950/50 flex items-center gap-4 border-b border-white/10">
          <img
            src={`/majice/${product.folder}/${color.file}`}
            alt={product.name}
            className="w-14 h-14 object-contain bg-zinc-200 rounded-sm p-1"
          />
          <div>
            <p className="text-white text-sm font-medium">{product.name}</p>
            <p className="text-white/40 text-xs mt-0.5">Boja: {color.name} · Veličina: {size}</p>
            <p className="text-yellow-500 text-sm font-bold mt-1">19.99€</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Ime</label>
              <input
                name="ime"
                value={form.ime}
                onChange={handleChange}
                placeholder="Vaše ime"
                className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm
                  ${errors.ime ? 'border-red-500' : 'border-white/10'}`}
              />
              {errors.ime && <p className="text-red-400 text-xs mt-1">{errors.ime}</p>}
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Prezime</label>
              <input
                name="prezime"
                value={form.prezime}
                onChange={handleChange}
                placeholder="Vaše prezime"
                className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm
                  ${errors.prezime ? 'border-red-500' : 'border-white/10'}`}
              />
              {errors.prezime && <p className="text-red-400 text-xs mt-1">{errors.prezime}</p>}
            </div>
          </div>

          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Broj telefona</label>
            <input
              name="telefon"
              type="tel"
              value={form.telefon}
              onChange={handleChange}
              placeholder="+382 xx xxx xxx"
              className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm
                ${errors.telefon ? 'border-red-500' : 'border-white/10'}`}
            />
            {errors.telefon && <p className="text-red-400 text-xs mt-1">{errors.telefon}</p>}
          </div>

          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Adresa dostave</label>
            <input
              name="adresa"
              value={form.adresa}
              onChange={handleChange}
              placeholder="Ulica, broj, grad"
              className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm
                ${errors.adresa ? 'border-red-500' : 'border-white/10'}`}
            />
            {errors.adresa && <p className="text-red-400 text-xs mt-1">{errors.adresa}</p>}
          </div>

          <button
            type="submit"
            className="mt-1 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold uppercase tracking-widest py-3 transition-colors duration-300 rounded-sm cursor-pointer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Potvrdi narudžbu
          </button>

          <p className="text-white/20 text-xs text-center">
            Klikom na dugme otvara se WhatsApp sa vašim podacima
          </p>
        </form>
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)

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

  return (
    <div className="min-h-screen bg-black">
      {/* Modal */}
      {showModal && (
        <OrderModal
          product={product}
          color={color}
          size={selectedSize}
          onClose={() => setShowModal(false)}
        />
      )}

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
      </div>

      {/* Content */}
      <div className="pt-16 min-h-screen flex flex-col lg:flex-row">

        {/* Image panel */}
        <div className="lg:w-1/2 bg-zinc-200 flex items-center justify-center p-8 sm:p-16 min-h-[50vh] lg:min-h-screen lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
          <div className="relative w-full max-w-sm">
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
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
            <h1
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-white/40 text-lg line-through">26.99€</span>
              <span className="text-yellow-500 text-2xl font-bold">19.99€</span>
              <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide">-26%</span>
            </div>
          </div>

          {/* Color */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
              Boja — <span className="text-white">{color.name}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedColor(i); setImgLoaded(false) }}
                  title={c.name}
                  className="relative w-14 h-14 rounded-sm overflow-hidden border-2 transition-all duration-200 cursor-pointer"
                  style={{
                    borderColor: selectedColor === i ? '#D4AF37' : 'transparent',
                    outline: selectedColor === i ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <img
                    src={`/majice/${product.folder}/${c.file}`}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
              Veličina {selectedSize
                ? <span className="text-white">— {selectedSize}</span>
                : <span className="text-white/30">(izaberi)</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 text-sm font-semibold border transition-all duration-200 cursor-pointer rounded-sm
                    ${selectedSize === size
                      ? 'bg-yellow-500 border-yellow-500 text-black'
                      : 'bg-transparent border-white/20 text-white/70 hover:border-white hover:text-white'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Order button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => selectedSize && setShowModal(true)}
              disabled={!selectedSize}
              className={`w-full py-4 px-8 text-sm font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm
                ${selectedSize
                  ? 'bg-white text-black hover:bg-yellow-500 cursor-pointer'
                  : 'bg-zinc-800 text-white/30 cursor-not-allowed'
                }`}
            >
              {selectedSize ? 'Naruči' : 'Izaberi veličinu'}
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
