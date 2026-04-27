import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Contact from './components/Contact'
import ProductDetail from './pages/ProductDetail'

function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Products />
      <Contact />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/majica/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
