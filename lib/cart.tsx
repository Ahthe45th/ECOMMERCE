import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "../types";

interface CartContextValue {
  items: Product[];
  addItem: (p: Product) => void;
  removeItem: (id?: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (p: Product) => setItems((prev) => [...prev, p]);
  const removeItem = (id?: string) => {
    if (!id) return;
    setItems((prev) => prev.filter((i) => i._id !== id));
  };
  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}
