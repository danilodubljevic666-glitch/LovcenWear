import { useInView } from '../hooks/useInView'

const reviews = [
  {
    name: 'Nikola Vukčević',
    text: 'Odličan kvalitet majice, materijal je mekan i udoban. Nosim je svaki dan i dobijam komplimente. Definitivno naručujem ponovo!',
    stars: 5,
  },
  {
    name: 'Milica Petrović',
    text: 'Bila sam malo skeptična pri naručivanju online, ali majica je stigla brzo i izgleda tačno kao na slici. Veoma zadovoljna!',
    stars: 5,
  },
  {
    name: 'Jovan Bojović',
    text: 'Kupio sam Polo majicu kao poklon prijatelju i bio je oduševljen. Dizajn je moderan, a kvalitet prvoklastan. Svaka preporuka!',
    stars: 5,
  },
  {
    name: 'Ana Đurović',
    text: 'Konačno brend koji spaja crnogorski ponos i moderan stil. Majica je savršeno sašivena, boja ne blijedi ni nakon pranja.',
    stars: 5,
  },
  {
    name: 'Stefan Knežević',
    text: 'Naručio sam dvije majice odjednom i obje su stigle u roku. Premium majica u crvenoj boji je posebno upečatljiva. Top!',
    stars: 5,
  },
  {
    name: 'Marko Radović',
    text: 'Ultras majica je baš to što sam tražio — kvalitetna, udobna i sa ponosom nosi crnogorski identitet. Svaka čast ekipi!',
    stars: 5,
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [ref, inView] = useInView()

  return (
    <section className="bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">Šta kažu kupci</h2>
          <div className="w-12 h-0.5 bg-yellow-500 mx-auto mt-4" />
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="bg-zinc-900 rounded-sm p-6 flex flex-col gap-4 border border-white/5 hover:border-white/10 transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <Stars />
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-xs font-bold shrink-0">
                  {r.name.charAt(0)}
                </div>
                <span className="text-white text-sm font-medium">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
