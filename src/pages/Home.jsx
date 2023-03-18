import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import homeStyles from "../features/home/Home.module.css";
import Header from "../features/header/Header";
import Profile from "../features/profile/Profile";
import PeopleCards from "../features/peopleCards/Cards";
import profileDefaultImage from "../media/default.png";

export const UserContext = React.createContext({});

export default function Home() {
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    surname: "",
    profilePic: profileDefaultImage,
    friends: [],
  });
  const [reloadUser, setReloadUser] = React.useState(false);
  const authHeader = `Bearer ${localStorage.getItem("pixit")}`;

  React.useEffect(() => {
    axios
      .get("/users/me", { headers: { Authorization: authHeader } })
      .then((res) => {
        setCurrentUser({
          _id: res.data.id,
          name: res.data.name,
          surname: res.data.surname,
          profilePic: res.data.profilePic
            ? res.data.profilePic
            : profileDefaultImage,
          friends: res.data.friends,
          friendsLen: res.data.friendsLen,
          postsLen: res.data.postsLen,
        });
        setReloadUser(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [reloadUser, authHeader]);

  return (
    <UserContext.Provider value={{ currentUser, setReloadUser }}>
      <div className={homeStyles["container"]}>
        <Header />
        <Profile />
        <Outlet />
        <PeopleCards />
      </div>
    </UserContext.Provider>
  );
}
