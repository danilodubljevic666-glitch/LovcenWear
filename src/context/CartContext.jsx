import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) ?? []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, color, size, customization = null) => {
    const key = `${product.id}__${color.name}__${size}__${customization?.prezime ?? ''}`
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { key, product, color, size, qty: 1, customization }]
    })
  }

  const removeItem = (key) => setItems((prev) => prev.filter((i) => i.key !== key))

  const updateQty = (key, qty) => {
    if (qty < 1) { removeItem(key); return }
    setItems((prev) => prev.map((i) => i.key === key ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
