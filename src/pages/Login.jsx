import React from "react";
import axios from "axios";
import commonStyles from "../features/common/Common.module.css";
import loginStyles from "../features/login/Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import LeftPanel from "../features/leftPanel/LeftPanel";
import logo from "../media/alphalogo.png";

export default function Login() {
  const [loginCredentials, setLoginCredentials] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginCredentials({
      ...loginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/login", loginCredentials)
      .then((res) => {
        localStorage.setItem("pixit", res.data.jwt);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className={loginStyles["container"]}>
      <LeftPanel />
      <div className={loginStyles["right-panel"]}>
        <img className={loginStyles["logo"]} src={logo} alt={logo} />
        <form className={loginStyles["form"]} onSubmit={handleSubmit}>
          <div className={loginStyles["form-field"]}>
            <label htmlFor="email">Email</label>
            <input
              className={commonStyles["standard-input"]}
              name="email"
              type="text"
              value={loginCredentials.email}
              onChange={handleChange}
            />
          </div>
          <div className={loginStyles["form-field"]}>
            <label htmlFor="password">Senha</label>
            <input
              className={commonStyles["standard-input"]}
              name="password"
              type="password"
              value={loginCredentials.password}
              onChange={handleChange}
            />
          </div>
          <div className={loginStyles["form-button-area"]}>
            <Link to="/register">
              <small>Criar conta</small>
            </Link>
            <button className={commonStyles["standard-button"]} type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
