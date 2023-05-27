
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Check your email to reset your password");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {message ? <div>{message}</div> : (
        <form onSubmit={handleForgotPassword}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
      <p>Remembered your password? <Link to="/login">Log in</Link></p>
    </div>
  );
}

export default ForgotPassword;
