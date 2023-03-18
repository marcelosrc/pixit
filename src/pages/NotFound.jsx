import logo from "../media/logo.jpg";
import notFoundStyles from "../features/notFound/NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={notFoundStyles["container"]}>
      <Link to="/">
        <img src={logo} alt="PixIt!" />
      </Link>
      <h2>Página não encontrada</h2>
    </div>
  );
}
