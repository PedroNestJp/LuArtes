import React from "react";
import { Link } from "react-router-dom";

function Cart({ cartItems, removeFromCart, checkout }) {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - R${item.price.toFixed(2)}{" "}
            <button onClick={() => removeFromCart(item)}>Remover</button>
          </li>
        ))}
      </ul>
      <p>Total a ser pago: R${total.toFixed(2)}</p>
      <Link to="/checkout">
        <button>Efetuar Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;
