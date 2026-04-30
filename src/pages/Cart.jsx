import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CUSTOMIZATION_FEE = 3
const WHATSAPP_NUMBER = '38269XXXXXXX' // <-- unesi svoj WhatsApp broj (bez + i razmaka)

const itemTotal = (item) => {
  const extras = (item.customization?.prezimeRukav ? 1 : 0) + (item.customization?.prezimeLedjima ? 1 : 0)
  return item.qty * item.product.price + item.qty * extras * CUSTOMIZATION_FEE
}

function buildWhatsAppMessage(form, items) {
  const ukupno = items.reduce((s, i) => s + itemTotal(i), 0).toFixed(2)
  const stavke = items.map((i) => {
    let line = `• ${i.product.name} | ${i.color.name} | ${i.size} | ${i.qty}kom | ${itemTotal(i).toFixed(2)}€`
    if (i.customization?.prezimeLedjima) line += `\n  Leđa: ${i.customization.prezimeLedjima}`
    if (i.customization?.prezimeRukav)   line += `\n  Rukav: ${i.customization.prezimeRukav}`
    return line
  }).join('\n')

  return [
    `Nova narudžba – LovcenWear`,
    ``,
    `Ime: ${form.ime} ${form.prezime}`,
    `Tel: ${form.telefon}`,
    `Grad: ${form.grad}`,
    `Adresa: ${form.adresa}`,
    ``,
    `Artikli:`,
    stavke,
    ``,
    `Ukupno: ${ukupno}€`,
  ].join('\n')
}

function OrderModal({ items, onClose, onSuccess }) {
  const [form, setForm]     = useState({ ime: '', prezime: '', telefon: '', grad: '', adresa: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.ime.trim())     e.ime     = 'Obavezno polje'
    if (!form.prezime.trim()) e.prezime = 'Obavezno polje'
    if (!form.telefon.trim()) e.telefon = 'Obavezno polje'
    if (!form.grad.trim())    e.grad    = 'Obavezno polje'
    if (!form.adresa.trim())  e.adresa  = 'Obavezno polje'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }

    const message = buildWhatsAppMessage(form, items)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')

    setStatus('success')
    onSuccess()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget && status !== 'sending') onClose() }}
    >
      <div className="bg-zinc-900 border border-white/10 rounded-sm w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Success state */}
        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center gap-4 px-8 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-green-600/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.045-1.104l-.29-.173-2.956.839.84-2.881-.19-.297A7.963 7.963 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold">WhatsApp otvoren!</h3>
            <p className="text-white/50 text-sm">Poruka sa narudžbom je pripremljena. Samo pritisni "Pošalji" u WhatsApp-u.</p>
            <button onClick={onClose}
              className="mt-2 bg-white text-black text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-yellow-500 transition-colors rounded-sm cursor-pointer">
              Zatvori
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-semibold text-base tracking-wide">Podaci za narudžbu</h2>
              <button onClick={onClose} disabled={status === 'sending'} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items summary */}
            <div className="px-6 py-3 border-b border-white/10 flex flex-col gap-2">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <img src={`/majice/${item.product.folder}/${item.color.file}`} alt={item.product.name}
                    className="w-10 h-10 object-contain bg-zinc-200 rounded-sm p-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{item.product.name}</p>
                    <p className="text-white/40 text-xs">{item.color.name} · {item.size} · {item.qty}kom</p>
                    {item.customization?.prezimeLedjima && (
                      <p className="text-yellow-500/60 text-xs">Leđa: {item.customization.prezimeLedjima}</p>
                    )}
                    {item.customization?.prezimeRukav && (
                      <p className="text-yellow-500/60 text-xs">Rukav: {item.customization.prezimeRukav}</p>
                    )}
                  </div>
                  <p className="text-yellow-500 text-xs font-bold shrink-0">{itemTotal(item).toFixed(2)}€</p>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white/50 text-sm">Ukupno</span>
                <span className="text-yellow-500 font-bold">{items.reduce((s, i) => s + itemTotal(i), 0).toFixed(2)}€</span>
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
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Grad</label>
                <input name="grad" value={form.grad} onChange={handleChange} placeholder="Npr. Podgorica"
                  className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm ${errors.grad ? 'border-red-500' : 'border-white/10'}`} />
                {errors.grad && <p className="text-red-400 text-xs mt-1">{errors.grad}</p>}
              </div>
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-1.5">Adresa dostave</label>
                <input name="adresa" value={form.adresa} onChange={handleChange} placeholder="Ulica i broj"
                  className={`w-full bg-zinc-800 border text-white text-sm px-3 py-2.5 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm ${errors.adresa ? 'border-red-500' : 'border-white/10'}`} />
                {errors.adresa && <p className="text-red-400 text-xs mt-1">{errors.adresa}</p>}
              </div>

              <button type="submit"
                className="mt-1 w-full bg-[#25D366] text-white text-sm font-semibold uppercase tracking-widest py-3 hover:bg-[#1ebe59] transition-colors duration-300 rounded-sm cursor-pointer flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.045-1.104l-.29-.173-2.956.839.84-2.881-.19-.297A7.963 7.963 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
                Naruči putem WhatsApp-a
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCart()
  const [showModal, setShowModal] = useState(false)

  const total = items.reduce((s, i) => s + itemTotal(i), 0).toFixed(2)

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
                    {item.customization?.prezimeLedjima && (
                      <p className="text-yellow-500/70 text-xs mt-0.5">Leđa: {item.customization.prezimeLedjima}</p>
                    )}
                    {item.customization?.prezimeRukav && (
                      <p className="text-yellow-500/70 text-xs mt-0.5">Rukav: {item.customization.prezimeRukav}</p>
                    )}
                    <p className="text-yellow-500 text-sm font-bold mt-1">{itemTotal(item).toFixed(2)}€</p>
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

              <div className="bg-zinc-800 rounded-sm px-4 py-3 flex flex-col gap-1 border border-white/5">
                <p className="text-white/70 text-xs leading-relaxed">
                  <span className="text-yellow-500 font-semibold">Dostava za sve gradove 4€.</span> Važi samo za gradove Crne Gore.
                </p>
                <p className="text-white/50 text-xs leading-relaxed">
                  Majice će biti pripremljene i isporučene u roku od 3–5 radnih dana.
                </p>
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
