import React, { memo } from "react";
import { faCheck, faTimes, faTrash } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            size="medium"
            circular
            onClick={() => handleValidateBooking(booking, true)}
          >
            <FontAwesomeIcon fixedWidth size="lg" color="white" icon={faCheck} />
          </Button>
          <Button
            icon
            size="medium"
            color="pink"
            circular
            onClick={() => handleValidateBooking(booking, false)}
          >
            <FontAwesomeIcon fixedWidth size="lg" color="white" icon={faTimes} />
          </Button>
        </>
      )}
      {booking.bookingValidatedByAdmin !== null && (
        <Button
          icon
          color="red"
          size="big"
          circular
          onClick={() => handleDeleteBooking(booking)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      )}
    </div>
  );
};

export default memo(BookingControls);
