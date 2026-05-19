"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export type CartItem = {
  variantId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalQuantity: number;
  addItem: (variantId: string, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const cartStorageKey = "bbq-sauce-store-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedCart = window.localStorage.getItem(cartStorageKey);

    if (storedCart) {
      try {
        const parsedItems = JSON.parse(storedCart) as CartItem[];
        setItems(parsedItems);
      } catch {
        window.localStorage.removeItem(cartStorageKey);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
    }
  }, [isHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const updateQuantity = (variantId: string, quantity: number) => {
      const safeQuantity = Math.max(0, Math.min(quantity, 24));

      setItems((currentItems) => {
        if (safeQuantity === 0) {
          return currentItems.filter((item) => item.variantId !== variantId);
        }

        return currentItems.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: safeQuantity }
            : item
        );
      });
    };

    return {
      items,
      totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
      addItem: (variantId: string, quantity = 1) => {
        const safeQuantity = Math.max(1, Math.min(quantity, 24));

        setItems((currentItems) => {
          const existingItem = currentItems.find(
            (item) => item.variantId === variantId
          );

          if (existingItem) {
            return currentItems.map((item) =>
              item.variantId === variantId
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + safeQuantity, 24)
                  }
                : item
            );
          }

          return [...currentItems, { variantId, quantity: safeQuantity }];
        });
      },
      updateQuantity,
      removeItem: (variantId: string) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.variantId !== variantId)
        );
      },
      clearCart: () => setItems([])
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
