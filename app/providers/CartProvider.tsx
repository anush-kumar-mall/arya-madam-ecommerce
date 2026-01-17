"use client";

import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "@/lib/cartReducer";
import { CartItem } from "@/types/cart";

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  // 🔥 DERIVED STATE (SINGLE SOURCE OF TRUTH)
  const totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔥 ACTIONS
  const addToCart = (item: CartItem) =>
    dispatch({ type: "ADD_TO_CART", payload: item });

  const increaseQty = (id: string) =>
    dispatch({ type: "INCREASE_QTY", payload: id });

  const decreaseQty = (id: string) =>
    dispatch({ type: "DECREASE_QTY", payload: id });

  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
