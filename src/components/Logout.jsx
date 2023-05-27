import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

function Logout() {
  const history = useHistory();

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  return (
    <button onClick={handleLogout}>Sair</button>
  );
}

export default Logout;
