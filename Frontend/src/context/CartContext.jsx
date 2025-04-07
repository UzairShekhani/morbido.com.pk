import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ Toast added

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to Cart (Decrease from DB)
  const addToCart = async (item) => {
    const exists = cartItems.find((p) => p._id === item._id);

    if (exists) {
      setCartItems((prev) =>
        prev.map((p) =>
          p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${item._id}/decrease`);
      toast.success(" Added to cart");
    } catch (err) {
      toast.error("Failed to decrease stock");
    }
  };

  // ✅ Remove ONE from cart and increase DB quantity
  const removeOneFromCart = async (productId) => {
    const found = cartItems.find((item) => item._id === productId);
    if (!found) return;

    try {
      await axios.put(`http://localhost:5000/api/products/${productId}/increase`, {
        quantity: 1,
      });

      if (found.quantity === 1) {
        setCartItems((prev) => prev.filter((item) => item._id !== productId));
      } else {
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }

      toast.success(" Removed 1 item");
    } catch (err) {
      toast.error("Error increasing stock");
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast("🧹 Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeOneFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
