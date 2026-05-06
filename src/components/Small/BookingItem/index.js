import React, { memo } from "react";
import { Label } from "semantic-ui-react";
import { calculateDate } from "../../../utils";
import "../../styles/bookingitem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhoneAlt } from "@fortawesome/pro-duotone-svg-icons";

const BookingItem = ({
  bookerName,
  bookerEmail,
  bookerNumber,
  bookerPhoneNumber,
  bookingDate,
  bookingTime,
  bookingValidatedByAdmin,
}) => {
  const stateClass =
    bookingValidatedByAdmin === true
      ? "validated"
      : bookingValidatedByAdmin === false
      ? "refused"
      : "";

  return (
    <div className={`booking ${stateClass}`}>
      <Label
        color={
          bookingValidatedByAdmin
            ? "green"
            : bookingValidatedByAdmin === false
            ? "pink"
            : bookingValidatedByAdmin === null
            ? "blue"
            : "blue"
        }
        ribbon
      >
        <span
          className={`booking-ribbon ${
            bookingValidatedByAdmin === null && "animate"
          }`}
        >
          {bookingValidatedByAdmin
            ? "Acceptée"
            : bookingValidatedByAdmin === false
            ? "Refusée"
            : bookingValidatedByAdmin === null
            ? "New !"
            : "New !"}
        </span>
      </Label>
      <h3 className='booking-title'>
        {bookerName}{" "}
        {bookerPhoneNumber && (
          <a
            className="booking-contact-link"
            href={`tel: ${bookerPhoneNumber}`}
          >
            <span>
              <FontAwesomeIcon size='lg' color='white' icon={faPhoneAlt} />
            </span>
          </a>
        )}
        <a
          className="booking-contact-link"
          href={`mailto: ${bookerEmail}`}
        >
          <span>
            <FontAwesomeIcon size='lg' color='white' icon={faEnvelope} />
          </span>
        </a>
      </h3>
      <p className='booking-date'>
        <span>{calculateDate(bookingDate)[1]}, Le </span>
        <span>
          {new Date(bookingDate).toLocaleString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span> à {bookingTime}</span>
      </p>
      <p className='booking-number'>
        Pour : <span>{bookerNumber}</span> personnes
      </p>
    </div>
  );
};

export default memo(BookingItem);
