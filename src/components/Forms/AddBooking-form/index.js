import React from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { getFieldValue } from "../../../utils";

const AddBookingForm = ({ handleSubmit, booking, setBooking, loading }) => {
  return (
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
        <label htmlFor="bookerEmail">Votre Email</label>
        <input
          id="bookerEmail"
          name="bookerEmail"
          value={booking.bookerEmail}
          autoComplete="email"
          type="email"
          placeholder="Votre email : toto@toto.fr ..."
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
          placeholder="Nombre de personnes"
          type="number"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookingDate}>
        <label htmlFor="bookingDate">Date de votre reservation</label>
        <Input
          id="bookingDate"
          name="bookingDate"
          value={booking.bookingDate}
          placeholder="La date de votre réservation"
          type="date"
          onChange={(e) => getFieldValue(e, setBooking, booking)}
        />
      </Form.Field>
      <Form.Field required error={!booking.bookingTime}>
        <label htmlFor="bookingTime">Heure de votre reservation</label>
        <span style={{color: "white", textAlign:"center", fontSize:"1.3em", fontWeight: "bold"}}>Minimum 18h00</span>
        <Input
          id="bookingTime"
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
          circular
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
