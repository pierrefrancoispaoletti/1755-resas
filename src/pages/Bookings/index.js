import React from "react";
import { tokenName } from "../../_const/index";
import { useEffect } from "react";
import { useState } from "react";
import CallAxios from "../../database/index";
import BookingItem from "../../components/Small/BookingItem/index";
import BookingControls from "../../components/Small/BookingControls";
import { Divider } from "semantic-ui-react";
import { calculateDate } from "../../utils";
import FilterButtons from "../../components/Small/FilterButtons";
import { bookingsFilter } from "../../utils/index";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import NoBookings from "../../components/Small/NoBookings";

const Bookings = ({ setMessage }) => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    if (Capacitor.getPlatform() === "android") {
      const jwtToken = localStorage.getItem(`token-${tokenName}`);

      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          return;
        }
      });

      //refactoriser ici afin de pouvoir recuperer les tokens des utilisateurs

      PushNotifications.addListener("registration", (Token) => {
        async function postAdminRegistrationToken() {
          const response = await CallAxios.postAdminRegistrationToken(
            jwtToken,
            Token
          );
        }
        postAdminRegistrationToken();
      });

      PushNotifications.addListener("registrationError", (error) => {});
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(`token-${tokenName}`);
    async function getBookings() {
      setLoading(true);
      const response = await CallAxios.getAllBookings(token);

      if (response && response.data.status === 200) {
        const { bookings, message } = response.data;
        bookings
          .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
          .sort(
            (a, b) =>
              (b.bookingValidatedByAdmin === null) -
              (a.bookingValidatedByAdmin === null)
          );
        setBookings([...bookings]);
        setLoading(false);
        setMessage({ success: true, message: message });
      } else {
        setLoading(false);
        setMessage({ success: false, message: "Il y a eu un probléme" });
      }
    }
    getBookings();
  }, []);

  // appel qui modifie ma valeur du champs bookingValidatedByAdmin a true ou false 
  // dans le but de valider ou de refuser la reservation
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
    <div>
      <FilterButtons
        setFilter={setFilter}
        bookings={bookings}
        filter={filter}
      />
      {bookings.length > 0 &&
        //filtre les reservations par la date et un filtre (0 1 2 -1)
        bookingsFilter(bookings, calculateDate, filter).map((booking) => {
          return (
            <>
              <BookingControls
                booking={booking}
                loading={loading}
                handleValidateBooking={handleValidateBooking}
                handleDeleteBooking={handleDeleteBooking}
              />
              <BookingItem {...booking} loading={loading} />
              <Divider />
            </>
          );
        })}
      {bookings.length === 0 && (
        <NoBookings />
      )}
    </div>
  );
};

export default Bookings;
