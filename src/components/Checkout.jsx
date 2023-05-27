import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Checkout({ cartItems, total, handleCheckout }) {
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar informações de pagamento
    if (!cardNumber || !cardExpiration || !cardCvc) {
      setErrorMessage("Por favor preencha todas as informações de pagamento.");
      return;
    }

    // Processar pagamento
    const { error } = await handleCheckout();
    if (error) {
      setErrorMessage(error.message);
      return;
    }

    // Redirecionar para página de confirmação
    history.push("/confirmation");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - R${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Total a ser pago: R${total.toFixed(2)}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número do cartão:</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </div>
        <div>
          <label>Data de validade:</label>
          <input type="text" value={cardExpiration} onChange={(e) => setCardExpiration(e.target.value)} />
        </div>
        <div>
          <label>CVC:</label>
          <input type="text" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} />
        </div>
        <button type="submit">Pagar</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Checkout;
