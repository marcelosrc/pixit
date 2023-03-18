import React from "react";
import loginStyles from "./LeftPanel.module.css";
import asian from "../../media/randLoginImages/Asian.jpg";
import bliss from "../../media/randLoginImages/Bliss.jpg";
import breathe from "../../media/randLoginImages/BreathnSmile.jpg";
import cabana from "../../media/randLoginImages/Cabana.jpg";
import frozen from "../../media/randLoginImages/Frozen.jpg";
import masquerade from "../../media/randLoginImages/Masquerade.jpg";
import nismo from "../../media/randLoginImages/Nismo.jpg";
import sin from "../../media/randLoginImages/OriginalSin.jpg";
import penhasco from "../../media/randLoginImages/Penhasco.jpg";
import logo from "../../media/alphalogo.png";

export default function LeftPanel() {
  const [randomImage, setRandomImage] = React.useState();

  React.useEffect(() => {
    const images = [
      asian,
      bliss,
      breathe,
      cabana,
      frozen,
      masquerade,
      nismo,
      sin,
      penhasco,
    ];
    setRandomImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  return (
    <div className={loginStyles["left-panel"]}>
      <img
        className={loginStyles["random-images"]}
        src={randomImage}
        alt="PixIt!"
      />
      <img className={loginStyles["logo"]} src={logo} alt={logo} />
    </div>
  );
}
