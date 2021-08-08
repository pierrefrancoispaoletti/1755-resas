import React from "react";
import { Checkbox } from "semantic-ui-react";

const BookingSwitch = ({ resaOpen, handleChangeResaOpen }) => {
  return (
    <Checkbox
      type="checkbox"
      toggle
      checked={resaOpen}
      onChange={() => handleChangeResaOpen()}
      label={resaOpen ? "Reservations activées" : "Réservations desactivées"}
    />
  );
};

export default BookingSwitch;
