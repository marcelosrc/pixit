import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../pages/Home";
import profileStyles from "./Profile.module.css";

export default function Profile() {
  const { currentUser } = React.useContext(UserContext);

  return (
    <div className={profileStyles["container"]}>
      <div className={profileStyles["panel"]}>
      <div className={profileStyles["panel-item"]}>
        <h4>{currentUser.name} no PixIt</h4>
      </div>
        <div className={profileStyles["panel-item"]}>
          <p>Seguindo</p>
          <p>{currentUser.friendsLen}</p>
        </div>
        <div className={profileStyles["panel-item"]}>
          <p>Postagens</p>
          <p>{currentUser.postsLen}</p>
        </div>
      </div>
      <div className={profileStyles["links"]}>
        <h4>
          Links
        </h4>
        <p>
          <Link to={`/users/${currentUser._id}`}>Ver meu Perfil</Link>
        </p>
        <p>
          <Link to="/logout">Sair</Link>
        </p>
      </div>
    </div>
  );
}
