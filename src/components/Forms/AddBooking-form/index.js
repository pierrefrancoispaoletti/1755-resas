import React from "react";
import { Button, Form } from "semantic-ui-react";
import { getFieldValue } from "../../../utils";

const AddBookingForm = ({
  handleSubmit,
  booking,
  setBooking,
  loading,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field required error={!booking.bookerName}>
        <label>Votre nom</label>
        <input
          name="bookerName"
          value={booking.bookerName}
          autoComplete="name"
          placeholder="Votre nom et prénom"
          type="text"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookerEmail}>
        <label>Votre Email</label>
        <input
          name="bookerEmail"
          value={booking.bookerEmail}
          autoComplete="email"
          type="email"
          placeholder="Votre email : toto@toto.fr ..."
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookerNumber}>
        <label>Votre Nombre</label>
        <input
          name="bookerNumber"
          value={booking.bookerNumber}
          step={1}
          placeholder="Votre nombre : 5..."
          type="number"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookingDate}>
        <label>Date de votre reservation</label>
        <input
        style={{display: "block", minWidth:"96%"}}
          name="bookingDate"
          value={booking.bookingDate}
          placeholder="La date de votre réservation"
          type="date"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookingTime}>
        <label>Heure de votre reservation</label>
        <input
        style={{display: "block", minWidth:"96%"}}
          name="bookingTime"
          value={booking.bookingTime}
          placeholder="L'Heure de votre réservation"
          min="0"
          type="time"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field>
        <Button
          size="massive"
          loading={loading}
          disabled={
            loading ||
            !booking.bookerName ||
            !booking.bookerNumber ||
            !booking.bookerEmail ||
            !booking.bookingDate ||
            !booking.bookingTime
          }
          color="blue"
          type="submit"
          content="Je Reserve !"
        />
      </Form.Field>
    </Form>
  );
};

export default AddBookingForm;
