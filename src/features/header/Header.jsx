import React from "react";
import { UserContext } from "../../pages/Home";
import { useNavigate, Link } from "react-router-dom";
import headerStyles from "./Header.module.css";
import logo from "../../media/logo.jpg";

export default function Header() {
  const { currentUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("pixit");
    navigate("/login");
  };

  return (
    <header>
      <div className={headerStyles["left-panel"]}>
        <Link to="/">
          <img src={currentUser.profilePic} alt={currentUser.name} />
        </Link>
        <div className={headerStyles["credentials"]}>
          <Link to="/">
            <p>{currentUser.name}</p>
          </Link>
          <Link to="/">
            <p className={headerStyles["surname"]}>{currentUser.surname}</p>
          </Link>
        </div>
      </div>
      <img src={logo} alt={logo} />
      <div className={headerStyles["right-panel"]}>
        <p onClick={handleLogout}>Sair</p>
      </div>
    </header>
  );
}
