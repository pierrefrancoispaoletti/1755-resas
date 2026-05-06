import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { getFieldValue } from "../../../utils";
import "./addbookingform.css";

const AddBookingForm = ({ handleSubmit, booking, setBooking, loading }) => {
  return (
    <div className="add-booking-form">
      <Form onSubmit={handleSubmit}>
        <Form.Field required error={!booking.bookerName}>
          <label htmlFor="bookerName">Votre nom</label>
          <input
            id="bookerName"
            name="bookerName"
            value={booking.bookerName}
            autoComplete="name"
            placeholder="Votre nom et prénom"
            type="text"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookerEmail}>
          <label htmlFor="bookerEmail">Votre email</label>
          <input
            id="bookerEmail"
            name="bookerEmail"
            value={booking.bookerEmail}
            autoComplete="email"
            type="email"
            placeholder="toto@toto.fr"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookerPhoneNumber}>
          <label htmlFor="bookerPhoneNumber">Numéro de téléphone</label>
          <input
            id="bookerPhoneNumber"
            name="bookerPhoneNumber"
            value={booking.bookerPhoneNumber}
            autoComplete="tel"
            type="text"
            placeholder="06 ... ... ..."
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookerNumber}>
          <label htmlFor="bookerNumber">Nombre de personnes</label>
          <input
            id="bookerNumber"
            name="bookerNumber"
            value={booking.bookerNumber}
            min={1}
            step={1}
            placeholder="5"
            type="number"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookingDate}>
          <label htmlFor="bookingDate">Date de la réservation</label>
          <Input
            id="bookingDate"
            name="bookingDate"
            value={booking.bookingDate}
            type="date"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <Form.Field required error={!booking.bookingTime}>
          <label htmlFor="bookingTime">Heure de la réservation</label>
          <span className="time-hint">Minimum 18h00</span>
          <Input
            id="bookingTime"
            name="bookingTime"
            value={booking.bookingTime}
            min="0"
            type="time"
            onChange={(e) => getFieldValue(e, setBooking, booking)}
          />
        </Form.Field>
        <div className="submit-row">
          <Button
            circular
            size="massive"
            loading={loading}
            disabled={
              loading ||
              !booking.bookerName ||
              !booking.bookerNumber ||
              !booking.bookerEmail ||
              !booking.bookingDate ||
              !booking.bookerPhoneNumber ||
              !booking.bookingTime
            }
            color="blue"
            type="submit"
            content="Je réserve !"
          />
        </div>
      </Form>
    </div>
  );
};

export default AddBookingForm;
