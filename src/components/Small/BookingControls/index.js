import { faCheck, faTimes, faTrash } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "semantic-ui-react";

import "../../styles/bookingcontrols.css";

const BookingControls = ({
  booking,
  handleValidateBooking,
  handleDeleteBooking,
}) => {
  return (
    <div className="bookingcontrols">
      {booking.bookingValidatedByAdmin === null && (
        <>
          <Button
            icon
            color="green"
            circular
            onClick={() => handleValidateBooking(booking, true)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button
            icon
            color="pink"
            circular
            onClick={() => handleValidateBooking(booking, false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </>
      )}
      {booking.bookingValidatedByAdmin !== null && (
        <Button
          icon
          color="red"
          circular
          onClick={() => handleDeleteBooking(booking)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </div>
  );
};

export default BookingControls;
