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
            size="big"
            circular
            onClick={() => handleValidateBooking(booking, true)}
          >
            <FontAwesomeIcon fixedWidth size="2x" color="white" icon={faCheck} />
          </Button>
          <Button
            icon
            size="big"
            color="pink"
            circular
            onClick={() => handleValidateBooking(booking, false)}
          >
            <FontAwesomeIcon fixedWidth size="2x" color="white" icon={faTimes} />
          </Button>
        </>
      )}
      {booking.bookingValidatedByAdmin !== null && (
        <Button
          icon
          color="red"
          size="massive"
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
