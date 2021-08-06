import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Header,
  Icon,
  Transition,
} from "semantic-ui-react";
import CallAxios from "../../database/index";

import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/pro-duotone-svg-icons";

const Home = ({ user, setMessage, resaOpen, config, setConfig }) => {
  const [booking, setBooking] = useState({
    bookerName: "",
    bookerNumber: {},
    bookingDate: "",
    bookingTime: "",
    bookerEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const getFieldValue = (e) => {
    let newBooking = {};
    newBooking[e.target.name] = e.target.value;
    setBooking({ ...booking, ...newBooking });
  };

  const handleEmptyForm = () => {
    setBooking({
      bookerName: "",
      bookerNumber: {},
      bookingDate: "",
      bookingTime: "",
      bookerEmail: "",
    });
    setSuccess(false);
    setError(false);
    setLoading(false);
  };

  const handleChangeResaOpen = async () => {
    setLoading(true);
    const update = { _id: config._id, resaOpen: !config.resaOpen };
    const token = localStorage.getItem("token-1755");
    const response = await CallAxios.updateConfig(update, token);
    if (response && response.data.status === 200) {
      setConfig(response.data.updatedConfig);
      setMessage({ success: true, message: response.data.message });
      setLoading(false);
    } else {
      setMessage({ success: false, message: response.data.message });
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await CallAxios.postBooking(booking);
    if (response && response.data.status === 200) {
      setLoading(false);
      setMessage({ success: true, message: response.data.message });
      setError(false);
      setSuccess(true);
    } else {
      setLoading(false);
      setMessage({
        success: false,
        message:
          "il y eu un probléme lors de votre réservation veuillez reessayer" ||
          response.data.message,
      });
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="home">
      {user === "isAdmin" && (
        <Checkbox
          type="checkbox"
          toggle
          checked={resaOpen}
          onChange={() => handleChangeResaOpen()}
          label={
            resaOpen ? "Reservations activées" : "Réservations desactivées"
          }
        />
      )}
      {resaOpen ? (
        <>
          <Header
            as="h1"
            style={{
              background: success ? "green" : error ? "red" : "inherit",
            }}
          >
            {!success && !error
              ? "Reservez Votre table Maintenant !"
              : success
              ? "Votre réservation à été effectuée avec succés , vous allez recevoir un mail de confirmation"
              : error
              ? "Votre réservation à échouée, veuillez recommencer"
              : "Reservez Votre table Maintenant !"}
          </Header>
          {!success && !error && resaOpen && (
            <Transition
              animation="fade down"
              duration={300}
              visible={!success || !error}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Field required error={!booking.bookerName}>
                  <label>Votre nom</label>
                  <input
                    name="bookerName"
                    value={booking.bookerName}
                    type="text"
                    onChange={getFieldValue}
                  />
                </Form.Field>
                <Form.Field required error={!booking.bookerEmail}>
                  <label>Votre Email</label>
                  <input
                    name="bookerEmail"
                    value={booking.bookerEmail}
                    type="email"
                    onChange={getFieldValue}
                  />
                </Form.Field>
                <Form.Field required error={!booking.bookerNumber}>
                  <label>Votre Nombre</label>
                  <input
                    name="bookerNumber"
                    value={
                      booking.bookerNumber >= 6
                        ? 6
                        : booking.bookerNumber <= 1
                        ? 1
                        : booking.bookerNumber
                    }
                    min={1}
                    max={6}
                    step={1}
                    type="number"
                    onChange={getFieldValue}
                  />
                </Form.Field>
                <Form.Field required error={!booking.bookingDate}>
                  <label>Date de votre reservation</label>
                  <input
                    name="bookingDate"
                    value={booking.bookingDate}
                    type="date"
                    onChange={getFieldValue}
                  />
                </Form.Field>
                <Form.Field required error={!booking.bookingTime}>
                  <label>Heure de votre reservation</label>
                  <input
                    name="bookingTime"
                    value={
                      booking.bookingTime <= "18:30"
                        ? "18:30"
                        : booking.bookingTime
                    }
                    min="18:30"
                    max="01:00"
                    type="time"
                    onChange={getFieldValue}
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
            </Transition>
          )}
          {(error || success) && (
            <Button
              color="blue"
              icon
              type="button"
              labelPosition="left"
              onClick={() => handleEmptyForm()}
            >
              <Icon>
                <FontAwesomeIcon
                  style={{ marginTop: "5px" }}
                  size="2x"
                  icon={faRedo}
                />
              </Icon>
              Recharger
            </Button>
          )}
        </>
      ) : (
        <Header as="h1">
          Les réservations sont désactivées pour le moment , revenez demain !
        </Header>
      )}
    </div>
  );
};

export default Home;
