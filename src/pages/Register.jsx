import React from "react";
import axios from "axios";
import registerStyles from "../features/register/Register.module.css";
import commonStyles from "../features/common/Common.module.css";
import { Link, useNavigate } from "react-router-dom";
import LeftPanel from "../features/leftPanel/LeftPanel";
import defaultImage from "../media/default.png";

export default function Register() {
  const [newUser, setNewUser] = React.useState({
    profilePic: "",
    fileName: "",
    email: "",
    name: "",
    surname: "",
    dob: "",
    password: "",
    passwordConf: "",
  });
  const [picturePreview, setPicturePreview] = React.useState({
    filePath: defaultImage,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    axios
      .post(
        "/media/post",
        { pic: event.target.files[0] },
        { headers: { "content-type": "multipart/form-data" } }
      )
      .then((res) => {
        setNewUser({
          ...newUser,
          profilePic: res.data.filePath ? res.data.filePath : "",
          fileName: res.data.fileName,
        });
        setPicturePreview(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/users/create", newUser, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const cancelImagePost = () => {
    setNewUser({ ...newUser, fileName: "" });
    setPicturePreview({ filePath: defaultImage });
    axios.delete(`/media/remove/${picturePreview.fileName}`);
  };

  return (
    <div className={registerStyles["container"]}>
      <LeftPanel />
      <div className={registerStyles["right-panel"]}>
        <form className={registerStyles["form"]} onSubmit={handleSubmit}>
          <div className={registerStyles["form-profilepic-area"]}>
            <div className={registerStyles["form-field"]}>
              {picturePreview.filePath !== defaultImage ? (
                <button
                  className={commonStyles["standard-deny-button"]}
                  type="button"
                  onClick={cancelImagePost}
                >
                  Remover Foto
                </button>
              ) : (
                <label
                  type="button"
                  className={commonStyles["standard-label-button"]}
                >
                  <input type="file" name="image" onChange={handleFileChange} />
                  Escolher Foto
                </label>
              )}
            </div>
            <img
              className={registerStyles["form-profilepic"]}
              src={picturePreview.filePath}
              alt={picturePreview.filePath}
            />
          </div>
          <div className={registerStyles["form-field"]}>
            <label htmlFor="email">Email</label>
            <input
              className={commonStyles["standard-input"]}
              name="email"
              type="text"
              maxLength="100"
              value={newUser.email}
              onChange={handleChange}
            />
          </div>
          <div className={registerStyles["form-field"]}>
            <label htmlFor="name">Nome</label>
            <input
              className={commonStyles["standard-input"]}
              name="name"
              type="text"
              maxLength="30"
              value={newUser.name}
              onChange={handleChange}
            />
          </div>
          <div className={registerStyles["form-field"]}>
            <label htmlFor="surname">Sobrenome</label>
            <input
              className={commonStyles["standard-input"]}
              name="surname"
              type="text"
              maxLength="30"
              value={newUser.surname}
              onChange={handleChange}
            />
          </div>
          <div className={registerStyles["form-field"]}>
            <label htmlFor="dob">Data de nascimento</label>
            <input
              className={commonStyles["standard-input"]}
              name="dob"
              type="date"
              min="1950-01-01"
              max="2012-01-01"
              value={newUser.dob}
              onChange={handleChange}
            />
          </div>
          <div className={registerStyles["form-field"]}>
            <label htmlFor="password">Senha</label>
            <input
              className={commonStyles["standard-input"]}
              name="password"
              type="password"
              maxLength="100"
              value={newUser.password}
              onChange={handleChange}
            />
          </div>
          <div className={registerStyles["form-field"]}>
            <label htmlFor="password">Confirmação da senha</label>
            <input
              className={commonStyles["standard-input"]}
              name="passwordConf"
              type="password"
              maxLength="100"
              value={newUser.passwordConf}
              onChange={handleChange}
            />
          </div>
          <div className={registerStyles["form-button-area"]}>
            <button className={commonStyles["standard-button"]} type="submit">
              Criar conta
            </button>
            <Link to="/login">
              <small>Voltar</small>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
