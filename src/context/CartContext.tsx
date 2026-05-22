import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CartItem, CartItemAddon, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, addons: CartItemAddon[], observation: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, quantity: number, addons: CartItemAddon[], observation: string) => {
    const id = `${product.id}-${Date.now()}`;
    setItems(prev => [...prev, { id, product, quantity, addons, observation }]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const addonsTotal = item.addons.reduce((a, addon) => a + addon.price * addon.quantity, 0);
    return acc + (item.product.price + addonsTotal) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
