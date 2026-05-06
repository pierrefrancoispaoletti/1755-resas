import React from "react";
import { Header } from "semantic-ui-react";

import "../../styles/homeheader.css";

const HomeHeader = ({ success, error }) => {
  return (
    <Header
      className="homeheader"
      as="h1"
      style={{
        background: success ? "green" : error ? "red" : "grey",
      }}
    >
      {!success && !error
        ? "Réservez votre table maintenant"
        : success
        ? "Votre réservation a été effectuée avec succès, vous allez recevoir un mail de confirmation"
        : error
        ? "Votre réservation a échoué, veuillez recommencer"
        : "Réservez votre table maintenant"}
    </Header>
  );
};

export default HomeHeader;
