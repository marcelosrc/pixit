import React from "react";
import axios from "axios";
import postOptionsStyles from "./PostOptions.module.css";

export default function PostOptions(props) {
  const [toShowOptions, setToShowOptions] = React.useState(false);
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;

  const showOptions = () => {
    setToShowOptions(true);
  };

  const leaveOptions = () => {
    setToShowOptions(false);
  };

  const removePost = () => {
    axios
      .delete("/posts/remove/" + props.post._id, {
        headers: { Authorization: authHeader },
      })
      .then((res) => {
        props.setReload(true);
      })
      .catch((err) => alert(err.response.data.message));
  };

  return (
    <div className={postOptionsStyles["container"]}>
      {toShowOptions ? (
        <div className={postOptionsStyles["options"]}>
          <div className={postOptionsStyles["options-item"]}>
            <small onClick={removePost}>Remover post</small>
          </div>
          <div className={postOptionsStyles["options-item"]}>
            <small onClick={leaveOptions} onTouchStart={leaveOptions}>
              Cancelar
            </small>
          </div>
        </div>
      ) : (
        <div
          className={postOptionsStyles["options-button"]}
          onClick={showOptions}
          onTouchStart={showOptions}
        />
      )}
    </div>
  );
}
