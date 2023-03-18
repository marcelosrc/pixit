import React from "react";

export default function RandomTitle() {
  const [randomImage, setRandomImage] = React.useState();

  React.useEffect(() => {
    const images = [
      "O que acontece?",
      "O que te aflige?",
      "No que está pensando?",
      "Manda o pprt",
      "Qual é a novidade?",
      "Qual é a polêmica de hoje?",
      "Mande o seu recado",
      "Joga a real",
      "Manda aquela indireta",
      "Manda",
      "O que se passa na sua cabeça?"
    ];
    setRandomImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  return randomImage;
}
