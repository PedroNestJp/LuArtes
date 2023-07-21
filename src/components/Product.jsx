import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Cart from "./Cart";

function Products() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productsList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const cart = localStorage.getItem("cartItems");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const removeFromCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    const item = cartItems[itemIndex];
    if (item.quantity === 1) {
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== product.id
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCartItems);
    }
  };

  const checkout = () => {
    if (window.confirm("Deseja finalizar a compra?")) {
      setCartItems([]);
      localStorage.removeItem("cartItems");
      alert("Compra finalizada com sucesso!");
    }
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R${product.price.toFixed(2)}{" "}
            <button onClick={() => addToCart(product)}>
              Adicionar ao carrinho
            </button>
          </li>
        ))}
      </ul>
      <Cart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        checkout={checkout}
      />
    </div>
  );
}

export default Products;
