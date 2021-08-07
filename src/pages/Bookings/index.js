import React from "react";
import { tokenName } from "../../_const/index";
import { useEffect } from "react";
import { useState } from "react";
import CallAxios from "../../database/index";
import BookingItem from "../../components/Small/BookingItem/index";
import BookingControls from "../../components/Small/BookingControls";
import { Divider } from "semantic-ui-react";

const Bookings = ({ setMessage }) => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem(`token-${tokenName}`);
    async function getBookings() {
      setLoading(true);
      const response = await CallAxios.getAllBookings(token);

      if (response && response.data.status === 200) {
        const { bookings, message } = response.data;
        bookings
          .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
          .sort(
            (a, b) => a.bookingValidatedByAdmin - b.bookingValidatedByAdmin
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
      {/* <div>
        <Button
          color="red"
          content="Jours Précédents"
          onClick={() => {
            let b = [];
            setBookings((bookings) => [
              ...b,
              ...bookings.filter(
                (booking) => calculateDate(booking.bookingDate) === -1
              ),
            ]);
          }}
        />
        <Button
          color="green"
          content="Aujourd'hui"
          onClick={() => {
            let b = [];
            setBookings((bookings) => [
              ...b,
              ...bookings.filter(
                (booking) =>
                  calculateDate(booking.bookingDate) === "Aujourd'hui, Le"
              ),
            ]);
          }}
        />
        <Button
          color="yellow"
          content="Jours Suivants"
          onClick={() =>
            setBookings((bookings) => [
              ...bookings.filter((booking) =>
                calculateDate(booking.bookingDate)
              ),
            ])
          }
        />
      </div> */}
      {bookings.length > 0 &&
        bookings.map((booking) => {
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
            justifyContent:"center",
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
