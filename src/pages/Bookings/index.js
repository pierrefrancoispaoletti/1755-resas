import React, { memo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { tokenName } from "../../_const/index";
import CallAxios from "../../database/index";
import BookingItem from "../../components/Small/BookingItem/index";
import BookingControls from "../../components/Small/BookingControls";
import { calculateDate } from "../../utils";
import FilterButtons from "../../components/Small/FilterButtons";
import { bookingsFilter } from "../../utils/index";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import NoBookings from "../../components/Small/NoBookings";
import jwt_decode from "jwt-decode";
import { getBookings, postAdminRegistrationToken } from "../../methods";
import { useApp } from "../../context/AppContext";

const Bookings = () => {
  const { setMessage, pushNotificationToken } = useApp();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem(`token-${tokenName}`);
    if (Capacitor.isNativePlatform()) {
      const decodedJwt = jwt_decode(token);
      const { user } = decodedJwt;

      if (
        pushNotificationToken &&
        user.registrationKey !== pushNotificationToken
      ) {
        postAdminRegistrationToken(token, pushNotificationToken);
      }

      PushNotifications.removeAllDeliveredNotifications();
    }
    getBookings(setLoading, setBookings, setMessage, token);
  }, []);

  const handleValidateBooking = async (booking, value) => {
    setLoading(true);
    const token = localStorage.getItem(`token-${tokenName}`);
    booking.bookingValidatedByAdmin = value;

    const response = await CallAxios.updateBooking(booking, token);

    if (response && response.data.status === 200) {
      const { updatedBooking, message } = response.data;

      let index = bookings.findIndex((b) => b._id === booking._id);
      bookings.splice(index, 1);

      setBookings([...bookings, updatedBooking]);
      setLoading(false);
      setMessage({ success: true, message: message });
    } else {
      setLoading(false);
      setMessage({ success: false, message: "Il y à eu un problème" });
    }
  };

  const handleDeleteBooking = async (booking) => {
    setLoading(true);

    const token = localStorage.getItem(`token-${tokenName}`);

    const response = await CallAxios.deleteBooking(booking, token);

    if (response && response.data.status === 200) {
      const { deletedBooking, message } = response.data;

      let index = bookings.findIndex((b) => b._id === deletedBooking._id);
      bookings.splice(index, 1);

      setBookings([...bookings]);
      setLoading(false);
      setMessage({ success: true, message: message });
    } else {
      setLoading(false);
      setMessage({ success: false, message: "Il y à eu un problème" });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", px: { xs: 1, sm: 2 }, py: 2 }}>
      <FilterButtons
        setFilter={setFilter}
        bookings={bookings}
        currentFilter={filter}
      />
      {bookings.length > 0 &&
        bookingsFilter(bookings, calculateDate, filter).map((booking) => (
          <Box key={booking._id} sx={{ mb: 2 }}>
            <BookingControls
              booking={booking}
              loading={loading}
              handleValidateBooking={handleValidateBooking}
              handleDeleteBooking={handleDeleteBooking}
            />
            <BookingItem {...booking} loading={loading} />
          </Box>
        ))}
      {bookingsFilter(bookings, calculateDate, filter).length === 0 && (
        <NoBookings filter={filter} />
      )}
    </Box>
  );
};

export default memo(Bookings);
