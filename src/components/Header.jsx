import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/contexts/AuthProvider";
import { BsPersonCircle, BsHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import "../styles/Header.css";
import Navbar from "./Navbar";

function Header({ currentUser, handleLogout, cartItems }) {
  const { user } = useAuth();

  return (
    <div className="navbarhome">
      <Navbar />
      <Link to="/" title="clique para ir para a tela inicial">
        <img
          className="headerLogo"
          src="./imgs/logo.jpg"
          alt="logo da Luartes"
        />
      </Link>

      <section className="headerSec3">
        <div className="areaProfile">
          {user ? (
            <Link
              to="/userProfile"
              alt="iconProfile"
              title="Ir para o seu perfil"
              className="iconProfileHome"
            >
              <p>Logado como {currentUser.email}</p>
              <BsPersonCircle />
            </Link>
          ) : (
            <Link
              to="/login"
              alt="iconProfile"
              title="Ir para o seu perfil"
              className="iconProfileHome"
              onClick={() => {
                alert("Faça seu Login ou cadastre-se");
              }}
            >
              <BsPersonCircle />
            </Link>
          )}
          <span className="text-profile-home">
            Faça seu{" "}
            <Link
              to="/login"
              id="link-login-header-home"
              title="Faça seu login"
              className="link-login-home"
              href="/login"
            >
              LOGIN
            </Link>{" "}
            ou
            <Link
              to="/signUp"
              id="link-cadastre-se-home"
              title="Faça o seu cadastro"
              className="link-cadastre-se-home"
              href="/register"
            >
              {" "}
              CADASTRE-SE
            </Link>
          </span>
        </div>

        <div className="iconsNavHome">
          <span>
            <Link
              to="/cart"
              className="icon-shoppingCart"
              id="iconShoppingCart"
              title="Ir para o seu carrinho"
            >
              <FaShoppingCart className="iconsHeader" />
            </Link>
          </span>
          <span>
            <a
              href="https:api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0"
              className="icon-support"
              id="iconSupporte"
              title="Fale conosco"
            >
              <RiCustomerService2Fill className="iconsHeader" />
            </a>
          </span>
          <span>
            <Link
              to="/favorites"
              className="favoriteIconNav"
              id="favoriteIconNav"
              title="Seus produtos favoritos"
            >
              <BsHeartFill className="iconsHeader" />
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
}

export default Header;
