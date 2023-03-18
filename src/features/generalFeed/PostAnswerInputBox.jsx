import React from "react";
import axios from "axios";
import { UserContext } from "../../pages/Home";
import commonStyles from "../common/Common.module.css";
import generalFeedStyles from "./GeneralFeed.module.css";

export default function PostAnswerInputBox(props) {
  const { currentUser } = React.useContext(UserContext);
  const [newAnswer, setNewAnswer] = React.useState({
    content: "",
  });
  const [focus, setFocus] = React.useState(false);
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;
  const maxLength = 300;

  const handleChange = (event) => {
    setNewAnswer({
      ...newAnswer,
      content: event.target.value,
      profilePic: currentUser.profilePic ? currentUser.profilePic : "",
      name: currentUser.name,
      ownerId: currentUser._id,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`/posts/createAnswer/${props.post._id}`, newAnswer, {
        headers: { Authorization: authHeader },
      })
      .then(() => {
        setNewAnswer({
          content: "",
        });
        props.setReload(true);
        setFocus(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const ifFocused = () => {
    setFocus(true);
  };

  const showSubmitControls = () => {
    return (
      <button className={commonStyles["standard-button"]} type="submit">
        Enviar
      </button>
    );
  };

  return (
    <>
      {props.post.image ? (
        <form
          className={generalFeedStyles["pixit-post-anwser-area"]}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div
            className={
              generalFeedStyles["pixit-post-answer-picture-input-area"]
            }
          >
            <input
              className={generalFeedStyles["pixit-post-answer-input"]}
              name="content"
              type="text"
              placeholder="Responder"
              value={newAnswer.content}
              onChange={handleChange}
              onFocus={ifFocused}
              maxLength={maxLength}
            />
          </div>
          {focus ? showSubmitControls() : null}
        </form>
      ) : (
        <form
          className={generalFeedStyles["post-anwser-area"]}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={generalFeedStyles["post-answer-picture-input-area"]}>
            <input
              className={generalFeedStyles["post-answer-input"]}
              name="content"
              type="text"
              placeholder="Responder"
              value={newAnswer.content}
              onChange={handleChange}
              onFocus={ifFocused}
              maxLength={maxLength}
            />
          </div>
          {focus ? showSubmitControls() : null}
        </form>
      )}
    </>
  );
}
