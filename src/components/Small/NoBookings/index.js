import React from "react";

const NoBookings = () => {
  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "1.8em",
        color: "white",
        fontSize: "1.5em",
      }}
    >
      <p>Désolé , Il n'y a pas de reservations aujourd'hui :-(</p>
    </div>
  );
};

export default NoBookings;
