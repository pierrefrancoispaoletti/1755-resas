import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "semantic-ui-react";

import "../../styles/bookingcontrols.css";
import {
  faCheckCircle,
  faTimesCircle,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

const BookingControls = ({
  booking,
  handleValidateBooking,
  handleDeleteBooking,
}) => {
  return (
    <div className='bookingcontrols'>
      {booking.bookingValidatedByAdmin === null && (
        <>
          <Button
            icon
            color='green'
            size='big'
            circular
            onClick={() => handleValidateBooking(booking, true)}
          >
            <FontAwesomeIcon
              fixedWidth
              size='2x'
              color='white'
              icon={faCheckCircle}
            />
          </Button>
          <Button
            icon
            size='big'
            color='pink'
            circular
            onClick={() => handleValidateBooking(booking, false)}
          >
            <FontAwesomeIcon
              fixedWidth
              size='2x'
              color='white'
              icon={faTimesCircle}
            />
          </Button>
        </>
      )}
      {booking.bookingValidatedByAdmin !== null && (
        <Button
          icon
          color='red'
          size='massive'
          circular
          onClick={() => handleDeleteBooking(booking)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      )}
    </div>
  );
};

export default memo(BookingControls);
