import React, { useEffect, useState } from "react";

import { Header, Transition } from "semantic-ui-react";

import CallAxios from "../../database/index";

import { tokenName } from "../../_const/index";

import BookingSwitch from "../../components/Small/BookingSwitch";
import EmptyFormButton from "../../components/Small/EmptyFormButton";
import AddBookingForm from "../../components/Forms/AddBooking-form";
import HomeHeader from "../../components/Small/HomeHeader";
import HomeMadeLoader from "../../components/Small/HomeMadeLoader";

import "../styles/home.css";

const Home = ({
  socket,
  user,
  setMessage,
  resaOpen,
  config,
  setConfig,
  pushNotificationToken,
}) => {
  const [booking, setBooking] = useState({
    bookerName: "",
    bookerNumber: "",
    bookerPhoneNumber: "",
    bookingDate: "",
    bookingTime: "",
    bookerEmail: "",
    pushNotificationToken: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let year = today.getFullYear();
    let time = "18:00";

    setBooking({
      ...booking,
      bookingDate: `${year}-0${mm}-${dd}`,
      bookingTime: time,
    });
  }, []);

  const handleEmptyForm = () => {
    setBooking({
      bookerName: "",
      bookerNumber: "",
      bookerPhoneNumber: "",
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
        message: "il y a eu un problème",
      });
      setLoading(false);
    }
  };

  // soumission du formulaire d'ajour de resa
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pushNotificationToken) {
      booking.pushNotificationToken = pushNotificationToken;
    }

    setLoading(true);
    const response = await CallAxios.postBooking(booking);
    if (response && response.data.status === 200) {
      setLoading(false);
      setMessage({ success: true, message: response.data.message });
      setError(false);
      setSuccess(true);
      socket.emit("newBooking", response.data.newBooking);
    } else {
      setLoading(false);
      setMessage({
        success: false,
        message:
          "il y eu un probléme lors de votre réservation veuillez reessayer",
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

      <HomeMadeLoader loading={loading} />

      {!loading && resaOpen ? (
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
        !loading && (
          <Header as="h1" className="homeheader">
            Les réservations sont désactivées pour le moment , revenez demain !
          </Header>
        )
      )}
    </div>
  );
};

export default Home;
