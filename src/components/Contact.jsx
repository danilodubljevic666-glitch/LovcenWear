import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

// -------------------------------------------------------------------
// 1. Idi na https://www.emailjs.com i registruj se
// 2. Add New Service → Gmail → poveži lovcenwear@gmail.com → kopiraj Service ID
// 3. Email Templates → Create New Template → kopiraj Template ID
//    U template polji koristi: {{from_name}}, {{from_email}}, {{message}}
//    "To email" postavi na lovcenwear@gmail.com
// 4. Account → General → Public Key → kopiraj
// -------------------------------------------------------------------
const SERVICE_ID  = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">Kontakt</h2>
          <div className="w-12 h-0.5 bg-yellow-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Info */}
          <div className="flex flex-col gap-8">
            <p className="text-white/50 text-sm sm:text-base leading-relaxed">
              Imate pitanje ili želite da naručite? Javite nam se putem forme ili direktno putem kontakta ispod.
            </p>

            <div className="flex flex-col gap-5">
              <a href="tel:+38269463403" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-yellow-500 transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">+382 69 463 403</span>
              </a>

              <a href="mailto:lovcenwear@gmail.com" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-yellow-500 transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">lovcenwear@gmail.com</span>
              </a>

              <a href="https://instagram.com/lovcen_wear" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-yellow-500 transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">@lovcen_wear</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Ime i prezime</label>
              <input
                type="text"
                name="from_name"
                required
                placeholder="Vaše ime"
                className="w-full bg-zinc-900 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm"
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                name="from_email"
                required
                placeholder="vas@email.com"
                className="w-full bg-zinc-900 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm"
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Poruka</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Vaša poruka..."
                className="w-full bg-zinc-900 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-yellow-500 transition-colors placeholder:text-white/20 rounded-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 bg-white text-black text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-yellow-500 hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
            >
              {status === 'sending' ? 'Šalje se...' : 'Pošalji upit'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm text-center mt-1">
                Poruka uspješno poslata! Javićemo vam se uskoro.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center mt-1">
                Greška pri slanju. Kontaktirajte nas direktno na lovcenwear@gmail.com
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  )
}
