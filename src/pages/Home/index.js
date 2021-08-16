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

const Home = ({ user, setMessage, resaOpen, config, setConfig }) => {
  const [booking, setBooking] = useState({
    bookerName: "",
    bookerNumber: "",
    bookingDate: "",
    bookingTime: "",
    bookerEmail: "",
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
      <a
        href="https://apps.apple.com/fr/app/1755-r%C3%A9servation/id1581182779?itsct=apps_box_badge&amp;itscg=30200"
        style={{
          display: "inline-block",
          overflow: "hidden",
          borderRadius: "13px",
          width: "250px",
          height: "83px",
        }}
      >
        <img
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/fr-fr?size=250x83&amp;releaseDate=1628899200&h=e8c99d2716361f18893a828bf513b8ef"
          alt="Download on the App Store"
          style={{ borderRadius: "13px", width: "250px", height: "83px" }}
        />
      </a>
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
