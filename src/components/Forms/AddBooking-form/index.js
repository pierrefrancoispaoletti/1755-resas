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
          type="text"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookerEmail}>
        <label>Votre Email</label>
        <input
          name="bookerEmail"
          value={booking.bookerEmail}
          type="email"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookerNumber}>
        <label>Votre Nombre</label>
        <input
          name="bookerNumber"
          value={booking.bookerNumber}
          min={1}
          max={6}
          step={1}
          type="number"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookingDate}>
        <label>Date de votre reservation</label>
        <input
          name="bookingDate"
          value={booking.bookingDate}
          type="date"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookingTime}>
        <label>Heure de votre reservation</label>
        <input
          name="bookingTime"
          value={booking.bookingTime}
          min="18:30"
          max="01:00"
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
