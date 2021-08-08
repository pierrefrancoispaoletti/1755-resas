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

      PushNotifications.addListener("registration", (Token) => {
        async function postAdminRegistrationToken() {
          const response = await CallAxios.postAdminRegistrationToken(
            jwtToken,
            Token
          );
          if (response && response.data.status === 200) {
            console.log(response.data);
          } else {
            console.log("ca m'aurrait étoné que ca marche du premier coup :-)");
          }
        }
        postAdminRegistrationToken();
      });

      PushNotifications.addListener("registrationError", (error) => {
        alert("Error on registration: " + JSON.stringify(error));
      });
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
        <div
          style={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "1.8em",
            color: "white",
            fontSize: "1.5em",
          }}
        >
          <p>Désolé , Il n'y a pas de reservations aujourd'hui :-(</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
