import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Helper functions to interact with localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

const CartContext = createContext()

const cartReducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'ADD_ITEM':
      newState = [...state, { ...action.payload, quantity: 1 }]
      break
    case 'REMOVE_ITEM':
      newState = state.filter(item => item.id !== action.payload.id)
      break
    case 'UPDATE_QUANTITY':
      newState = state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      break
    case 'CLEAR_CART':
      newState = []
      break
    default:
      newState = state
  }
  saveCartToLocalStorage(newState)
  return newState
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    return getCartFromLocalStorage()
  })

  useEffect(() => {
    saveCartToLocalStorage(cart)
  }, [cart])

  const addItemToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeItemFromCart = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product })
  }

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
