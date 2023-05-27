import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import logo from "../imgs/logo.jpg";
import "../styles/ShortHeader.css";
import Navbar from "./Navbar";

const ShortHeader = () => {
  return (
    <div className="navbarShort">
      <Navbar />
      <Link to="/" rel="noopener noreferrer">
        <img
          className="logoNestHeader"
          id="logoNestHeader"
          title="Clique para ir para a tela inicial"
          alt="logoNestHeader"
          src={logo}
        />
      </Link>
      <div className="areaProfileNavShort">
        <Link
          to="/userProfile"
          className="iconProfileHome"
          alt="iconProfileHome"
          title="Ir para o seu perfil"
        >
          {<BsIcons.BsPersonCircle />}
        </Link>
        <span className="textProfileNavShort">
          Faça seu{" "}
          <Link
            className="linkLoginNavShort"
            id="linkLoginNavShort"
            title="linkLoginNavShort"
            to="/login"
          >
          LOGIN
          </Link> ou{" "}
          <Link
            className="linkRegisterNavShort"
            id="linkRegisterNavShort"
            title="linkRegisterNavShort"
            to="/signup"
          >
          CADASTRE-SE
          </Link>
        </span>
      </div>
    </div>
  );
};
export default ShortHeader;
