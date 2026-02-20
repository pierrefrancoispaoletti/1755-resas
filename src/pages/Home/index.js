import React, { useEffect, useState } from "react";
import { Box, Collapse, Paper, Typography } from "@mui/material";
import { EventBusy as EventBusyIcon } from "@mui/icons-material";

import CallAxios from "../../database/index";
import { tokenName } from "../../_const/index";

import BookingSwitch from "../../components/Small/BookingSwitch";
import EmptyFormButton from "../../components/Small/EmptyFormButton";
import AddBookingForm from "../../components/Forms/AddBooking-form";
import HomeHeader from "../../components/Small/HomeHeader";
import HomeMadeLoader from "../../components/Small/HomeMadeLoader";

import { useApp } from "../../context/AppContext";
import { useConfig } from "../../context/ConfigContext";

const Home = () => {
  const { user, setMessage, pushNotificationToken } = useApp();
  const { config, setConfig } = useConfig();
  const { resaOpen } = config;

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
    let dd = `0${today.getDate()}`.slice(-2);
    let mm = `0${today.getMonth() + 1}`.slice(-2);
    let year = today.getFullYear();
    let time = "18:00";

    setBooking((prev) => ({
      ...prev,
      bookingDate: `${year}-${mm}-${dd}`,
      bookingTime: time,
    }));
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

  const handleSubmit = async (data) => {
    const bookingData = { ...data };
    if (pushNotificationToken) {
      bookingData.pushNotificationToken = pushNotificationToken;
    }

    setLoading(true);
    const response = await CallAxios.postBooking(bookingData);
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
          "il y eu un probléme lors de votre réservation veuillez reessayer",
      });
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 680,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          <Collapse in={!success && !error} timeout={300} sx={{ width: "100%" }}>
            <AddBookingForm
              handleSubmit={handleSubmit}
              setBooking={setBooking}
              booking={booking}
              loading={loading}
            />
          </Collapse>
          {(error || success) && (
            <EmptyFormButton handleEmptyForm={handleEmptyForm} />
          )}
        </>
      ) : (
        !loading && (
          <Paper
            elevation={2}
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "background.paper",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <EventBusyIcon sx={{ fontSize: 64, color: "text.disabled" }} />
              <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 500 }}>
                Les réservations sont désactivées pour le moment
              </Typography>
              <Typography variant="body2" sx={{ color: "text.disabled" }}>
                Revenez demain !
              </Typography>
            </Box>
          </Paper>
        )
      )}
    </Box>
  );
};

export default Home;
