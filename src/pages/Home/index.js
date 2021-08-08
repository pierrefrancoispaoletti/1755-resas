import React, { useState } from "react";
import { Header, Transition } from "semantic-ui-react";
import CallAxios from "../../database/index";

import "../styles/home.css";
import { tokenName } from "../../_const/index";
import BookingSwitch from "../../components/Small/BookingSwitch";
import EmptyFormButton from "../../components/Small/EmptyFormButton";
import AddBookingForm from "../../components/Forms/AddBooking-form";
import HomeHeader from "../../components/Small/HomeHeader";

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

  // gestion de la dispo des resas
  const handleChangeResaOpen = async () => {
    setLoading(true);
    const update = { _id: config._id, resaOpen: !config.resaOpen };
    const token = localStorage.getItem(`token-${tokenName}`);
    const response = await CallAxios.updateConfig(update, token);
    if (response && response.data.status === 200) {
      setConfig(response.data.updatedConfig);
      setMessage({ success: true, message: response.data.message });
      setLoading(false);
    } else {
      setMessage({
        success: false,
        message: response.data.message || "il y a eu un problème",
      });
      setLoading(false);
    }
  };

  // soumission du formulaire d'ajour de resa
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
        <BookingSwitch
          resaOpen={resaOpen}
          handleChangeResaOpen={handleChangeResaOpen}
        />
      )}
      {resaOpen ? (
        <>
          <HomeHeader success={success} error={error} />
          {!success && !error && resaOpen && (
            <Transition
              animation="fade down"
              duration={300}
              visible={!success || !error}
            >
              <AddBookingForm
                handleSubmit={handleSubmit}
                setBooking={setBooking}
                booking={booking}
                loading={loading}
              />
            </Transition>
          )}
          {(error || success) && (
            <EmptyFormButton handleEmptyForm={handleEmptyForm} />
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
