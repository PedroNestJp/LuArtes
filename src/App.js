import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Header from "./components/Header";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/ForgotPassword";
import Confirmation from "./pages/Confirmation";
import { auth } from "./config/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const handleCheckout = async () => {
    const stripe = window.Stripe("YOUR_STRIPE_PUBLIC_KEY");
    const { data } = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        total: cartItems.reduce((acc, item) => acc + item.price, 0),
      }),
    }).then((res) => res.json());

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    return { error };
  };

  return (
    <Router>
      <div>
        <Header currentUser={currentUser} cartItems={cartItems} />
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          {/* <Route exact path="/products/:id">
            <Product addToCart={addToCart} />
          </Route> */}
          {/* <Route exact path="/cart">
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} checkout={handleCheckout} />
          </Route> */}
          {/* <Route exact path="/checkout">
            <Checkout cartItems={cartItems} total={cartItems.reduce((acc, item) => acc + item.price, 0)} handleCheckout={handleCheckout} />
          </Route> */}
          <Route exact path="/login" element={<Login />}>
          </Route>
          <Route exact path="/register" element={<Register />}>
          </Route>
          <Route exact path="/password-reset" element={<PasswordReset />}>
          </Route>
          <Route exact path="/confirmation" element={ <Confirmation />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
