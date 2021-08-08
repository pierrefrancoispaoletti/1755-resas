import React from "react";
import { Header } from "semantic-ui-react";

const HomeHeader = ({success, error}) => {
  return (
    <Header
      as="h1"
      style={{
        background: success ? "green" : error ? "red" : "inherit",
      }}
    >
      {!success && !error
        ? "Reservez Votre table Maintenant !"
        : success
        ? "Votre réservation à été effectuée avec succés , vous allez recevoir un mail de confirmation"
        : error
        ? "Votre réservation à échouée, veuillez recommencer"
        : "Reservez Votre table Maintenant !"}
    </Header>
  );
};

export default HomeHeader;
