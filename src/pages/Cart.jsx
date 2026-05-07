import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { useCart } from '../context/CartContext'

const FEE_LEDJA = 3
const FEE_RUKAV = 3

const itemTotal = (item) => {
  const ledja = item.customization?.prezimeLedjima ? FEE_LEDJA : 0
  const rukav = item.customization?.prezimeRukav ? FEE_RUKAV : 0
  return item.qty * item.product.price + item.qty * (ledja + rukav)
}

const SERVICE_ID        = 'service_35t1kg4'
const ORDER_TEMPLATE_ID = 'template_jhrvu48'
const PUBLIC_KEY        = 'ASltbUGew2GCqRWiC'
const GITHUB_BASE       = 'https://raw.githubusercontent.com/danilodubljevic666-glitch/LovcenWear/main/public'

function OrderModal({ items, onClose, onSuccess }) {
  const [form, setForm]       = useState({ ime: '', prezime: '', telefon: '', grad: '', adresa: '' })
  const [errors, setErrors]   = useState({})
  const [status, setStatus]   = useState('idle') // idle | sending | success | error
  const [errMsg, setErrMsg]   = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }

    setStatus('sending')
    const first  = items[0]
    const ukupno = items.reduce((s, i) => s + itemTotal(i), 0).toFixed(2)
    const stavke = items.map((i) => {
      let line = `• ${i.product.name} | Boja: ${i.color.name} | Veličina: ${i.size} | Kom: ${i.qty}`
      if (i.customization?.prezimeLedjima) line += ` | Prezime na leđima: ${i.customization.prezimeLedjima}`
      if (i.customization?.prezimeRukav) line += ` | Prezime na rukavu: ${i.customization.prezimeRukav}`
      return line
    }).join('\n')

    try {
      const custDetails = []
      if (items.length > 1) custDetails.push(stavke)
      else {
        if (first.customization?.prezimeLedjima) custDetails.push(`Prezime na leđima: ${first.customization.prezimeLedjima}`)
        if (first.customization?.prezimeRukav)   custDetails.push(`Prezime na rukavu: ${first.customization.prezimeRukav}`)
      }

      await emailjs.send(SERVICE_ID, ORDER_TEMPLATE_ID, {
        customer_name:  `${form.ime} ${form.prezime}`,
        name:           `${form.ime} ${form.prezime}`,
        email:          form.telefon,
        phone:          form.telefon,
        city:           form.grad,
        address:        form.adresa,
        product_name:   items.map(i => i.product.name).join(', '),
        product_image:  `${GITHUB_BASE}/majice/${encodeURIComponent(first.product.folder)}/${encodeURIComponent(first.color.file)}`,
        color:          items.length === 1 ? first.color.name : items.map(i => i.color.name).join(', '),
        size:           items.length === 1 ? first.size       : items.map(i => i.size).join(', '),
        qty:            items.reduce((s, i) => s + i.qty, 0).toString(),
        order_details:  custDetails.join('\n'),
        total:          ukupno,
      }, { publicKey: PUBLIC_KEY })
      setStatus('success')
      onSuccess()
    } catch (err) {
      console.error('EmailJS order error:', err)
      setErrMsg(err?.text || err?.message || 'Nepoznata greška')
      setStatus('error')
    }
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
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white text-lg font-semibold">Narudžba primljena!</h3>
            <p className="text-white/50 text-sm">Javićemo vam se uskoro na broj koji ste naveli.</p>
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

              <button type="submit" disabled={status === 'sending'}
                className="mt-1 w-full bg-white text-black text-sm font-semibold uppercase tracking-widest py-3 hover:bg-yellow-500 transition-colors duration-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'sending' ? 'Šalje se...' : 'Potvrdi narudžbu'}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-xs text-center">Greška: {errMsg}</p>
              )}
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
