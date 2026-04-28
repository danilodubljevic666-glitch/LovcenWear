import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Reviews from './components/Reviews'
import Preloader from './components/Preloader'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-yellow-500 text-black flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-all duration-300 cursor-pointer"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', pointerEvents: visible ? 'auto' : 'none' }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

function HomePage({ ready }) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero ready={ready} />
      <Products />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const handleDone = useCallback(() => {
    setLoading(false)
    setReady(true)
  }, [])

  return (
    <BrowserRouter>
      <CartProvider>
        {loading && <Preloader onDone={handleDone} />}
        <ScrollToTop />
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease' }}>
          <Routes>
            <Route path="/" element={<HomePage ready={ready} />} />
            <Route path="/majica/:id" element={<ProductDetail />} />
            <Route path="/korpa" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
