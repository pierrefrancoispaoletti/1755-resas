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
  return (
    <div
      className='booking'
      style={{
        border: bookingValidatedByAdmin
          ? "3px solid green"
          : bookingValidatedByAdmin === false
          ? "3px solid pink"
          : bookingValidatedByAdmin === null
          ? ""
          : "",
      }}
    >
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
      <h2 className='booking-title'>
        {bookerName}{" "}
        {bookerPhoneNumber && (
          <a
            style={{ display: "inline-block", margin: "0 5px" }}
            href={`tel: ${bookerPhoneNumber}`}
          >
            <span>
              <FontAwesomeIcon size='2x' color='white' icon={faPhoneAlt} />
            </span>
          </a>
        )}
        <a
          style={{ display: "inline-block", margin: "0 5px" }}
          href={`mailto: ${bookerEmail}`}
        >
          <span>
            <FontAwesomeIcon size='2x' color='white' icon={faEnvelope} />
          </span>
        </a>
      </h2>
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
        <p> à {bookingTime}</p>
      </p>
      <p className='booking-number'>
        Pour : <span>{bookerNumber}</span> personnes
      </p>
    </div>
  );
};

export default memo(BookingItem);
