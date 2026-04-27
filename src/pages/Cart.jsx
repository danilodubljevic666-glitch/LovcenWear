import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const WHATSAPP = '38269463403'

function OrderModal({ items, onClose, onSuccess }) {
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

    const stavke = items.map((i) =>
      `• ${i.product.name} | Boja: ${i.color.name} | Veličina: ${i.size} | Kom: ${i.qty}`
    ).join('\n')

    const ukupno = (items.reduce((s, i) => s + i.qty, 0) * 19.99).toFixed(2)

    const text = encodeURIComponent(
      `Zdravo! Želim da naručim:\n\n${stavke}\n\n` +
      `*Ukupno:* ${ukupno}€\n\n` +
      `*Ime i prezime:* ${form.ime} ${form.prezime}\n` +
      `*Telefon:* ${form.telefon}\n` +
      `*Adresa:* ${form.adresa}`
    )
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank')
    onSuccess()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-zinc-900 border border-white/10 rounded-sm w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-base tracking-wide">Podaci za narudžbu</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items summary */}
        <div className="px-6 py-3 border-b border-white/10 flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <img
                src={`/majice/${item.product.folder}/${item.color.file}`}
                alt={item.product.name}
                className="w-10 h-10 object-contain bg-zinc-200 rounded-sm p-0.5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{item.product.name}</p>
                <p className="text-white/40 text-xs">{item.color.name} · {item.size} · {item.qty}kom</p>
              </div>
              <p className="text-yellow-500 text-xs font-bold shrink-0">{(item.qty * 19.99).toFixed(2)}€</p>
            </div>
          ))}
          <div className="flex justify-between pt-2 border-t border-white/10">
            <span className="text-white/50 text-sm">Ukupno</span>
            <span className="text-yellow-500 font-bold">{(items.reduce((s, i) => s + i.qty, 0) * 19.99).toFixed(2)}€</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Ime</label>
              <input name="ime" value={form.ime} onChange={handleChange} placeholder="Vaše ime"
                className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm ${errors.ime ? 'border-red-500' : 'border-white/10'}`} />
              {errors.ime && <p className="text-red-400 text-xs mt-1">{errors.ime}</p>}
            </div>
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Prezime</label>
              <input name="prezime" value={form.prezime} onChange={handleChange} placeholder="Vaše prezime"
                className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm ${errors.prezime ? 'border-red-500' : 'border-white/10'}`} />
              {errors.prezime && <p className="text-red-400 text-xs mt-1">{errors.prezime}</p>}
            </div>
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Broj telefona</label>
            <input name="telefon" type="tel" value={form.telefon} onChange={handleChange} placeholder="+382 xx xxx xxx"
              className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm ${errors.telefon ? 'border-red-500' : 'border-white/10'}`} />
            {errors.telefon && <p className="text-red-400 text-xs mt-1">{errors.telefon}</p>}
          </div>
          <div>
            <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Adresa dostave</label>
            <input name="adresa" value={form.adresa} onChange={handleChange} placeholder="Ulica, broj, grad"
              className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm ${errors.adresa ? 'border-red-500' : 'border-white/10'}`} />
            {errors.adresa && <p className="text-red-400 text-xs mt-1">{errors.adresa}</p>}
          </div>
          <button type="submit"
            className="mt-1 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold uppercase tracking-widest py-3 transition-colors duration-300 rounded-sm cursor-pointer">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Potvrdi narudžbu
          </button>
          <p className="text-white/20 text-xs text-center">Klikom se otvara WhatsApp sa svim podacima</p>
        </form>
      </div>
    </div>
  )
}

export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCart()
  const [showModal, setShowModal] = useState(false)

  const total = (items.reduce((s, i) => s + i.qty, 0) * 19.99).toFixed(2)

  return (
    <div className="min-h-screen bg-black">
      {showModal && (
        <OrderModal items={items} onClose={() => setShowModal(false)} onSuccess={clearCart} />
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

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "'Raleway', sans-serif" }}>
          Vaša korpa
        </h1>
        <div className="w-10 h-0.5 bg-yellow-500 mb-10" />

        {items.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <svg className="w-16 h-16 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <p className="text-white/30 text-base">Korpa je prazna</p>
            <Link to="/" className="mt-2 inline-block bg-white text-black text-sm font-semibold uppercase tracking-widest px-6 py-2.5 hover:bg-yellow-500 transition-colors rounded-sm">
              Pogledaj majice
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-8">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-4 bg-zinc-900 rounded-sm p-4">
                  <Link to={`/majica/${item.product.id}`}>
                    <img
                      src={`/majice/${item.product.folder}/${item.color.file}`}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain bg-zinc-200 rounded-sm p-1 shrink-0"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm sm:text-base truncate">{item.product.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{item.color.name} · {item.size}</p>
                    <p className="text-yellow-500 text-sm font-bold mt-1">{(item.qty * 19.99).toFixed(2)}€</p>
                  </div>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => updateQty(item.key, item.qty - 1)}
                      className="w-7 h-7 border border-white/20 text-white hover:border-white flex items-center justify-center transition-colors rounded-sm cursor-pointer text-lg leading-none">
                      −
                    </button>
                    <span className="text-white text-sm w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)}
                      className="w-7 h-7 border border-white/20 text-white hover:border-white flex items-center justify-center transition-colors rounded-sm cursor-pointer text-lg leading-none">
                      +
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.key)}
                    className="text-white/30 hover:text-red-500 transition-colors cursor-pointer shrink-0 ml-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-zinc-900 rounded-sm p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-white/50 text-sm">Ukupno artikala</span>
                <span className="text-white text-sm">{items.reduce((s, i) => s + i.qty, 0)} kom</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-white font-semibold">Ukupno</span>
                <span className="text-yellow-500 text-xl font-bold">{total}€</span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-4 bg-white text-black text-sm font-semibold uppercase tracking-widest hover:bg-yellow-500 transition-colors duration-300 rounded-sm cursor-pointer mt-2"
              >
                Naruči
              </button>
              <Link to="/"
                className="w-full py-3 border border-white/20 text-white/60 text-sm font-medium text-center hover:border-white hover:text-white transition-colors rounded-sm">
                Nastavi kupovinu
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
