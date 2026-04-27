import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Products />
      <Contact />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/majica/:id" element={<ProductDetail />} />
          <Route path="/korpa" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
