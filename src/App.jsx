import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function HomePage({ ready }) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero ready={ready} />
      <Products />
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
