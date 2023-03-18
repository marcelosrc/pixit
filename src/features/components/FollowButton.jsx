import React from "react";
import axios from "axios";
import { UserContext } from "../../pages/Home";
import commonStyles from "../common/Common.module.css";

export default function FollowButton(props) {
  const { currentUser, setReloadUser } = React.useContext(UserContext);
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;

  const addFollower = () => {
    axios
      .patch(
        "/users/update/" + currentUser._id,
        { $addToSet: { friends: props.anyUser.userId } },
        {
          headers: { Authorization: authHeader },
        }
      )
      .then(() => {
        props.setReload(true);
        setReloadUser(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const removeFollower = () => {
    axios
      .patch(
        "/users/update/" + currentUser._id,
        { $pull: { friends: props.anyUser.userId } },
        {
          headers: { Authorization: authHeader },
        }
      )
      .then(() => {
        props.setReload(true);
        setReloadUser(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  if (currentUser.friends?.includes(props.anyUser.userId)) {
    return (
      <button
        className={commonStyles["standard-deny-button"]}
        onClick={removeFollower}
      >
        Deixar de seguir
      </button>
    );
  } else if (props.anyUser.friends?.includes(currentUser._id)) {
    return (
      <button className={commonStyles["standard-button"]} onClick={addFollower}>
        Seguir de volta
      </button>
    );
  } else if (currentUser._id === props.anyUser.userId) {
    return null;
  }
  return (
    <button className={commonStyles["standard-button"]} onClick={addFollower}>
      Seguir
    </button>
  );
}
