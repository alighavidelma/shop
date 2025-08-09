import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContexType {
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContex = createContext<CartContexType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    axios.get("http://localhost:4000/cart").then((res) => setCart(res.data));
  }, []);

  const addToCart = async (item: CartItem) => {
    const existing = cart.find((p) => p.id === item.id);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + 1 };
      await axios.put(`http://localhost:4000/cart/${item.id}`, updated);
      setCart((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
    } else {
      await axios.post("http://localhost:4000/cart", item);
      setCart((prev) => [...prev, item]);
    }
  };
  const removeFromCart = async (id: number) => {
    await axios.delete(`http://localhost:4000/cart/${id}`);
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = async () => {
    for (const item of cart) {
      await axios.delete(`http://localhost:4000/cart/${item.id}`);
    }
    setCart([]);
  };

  return (
    <CartContex.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContex.Provider>
  );
}
