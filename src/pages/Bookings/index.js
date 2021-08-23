import React, { memo } from "react";
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
import jwt_decode from "jwt-decode";
import { getBookings, postAdminRegistrationToken } from "../../methods";

const Bookings = ({
  setMessage,
  bookings,
  setBookings,
  pushNotificationToken,
}) => {
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
    // dans /methods
    getBookings(setLoading, setBookings, setMessage, token);
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
        bookingsFilter(bookings, calculateDate, filter)?.map((booking) => {
          return (
            <>
              <BookingControls
                key={`bc-${booking._id}`}
                booking={booking}
                loading={loading}
                handleValidateBooking={handleValidateBooking}
                handleDeleteBooking={handleDeleteBooking}
              />
              <BookingItem key={booking._id} {...booking} loading={loading} />
              <Divider key={`dv-${booking._id}`}/>
            </>
          );
        })}
      {bookingsFilter(bookings, calculateDate, filter).length === 0 && (
        //dans ce composant on pourrait afficher un message plus personalisé d'absence de resa
        // par ex il n'y a pas de reservations demain, pas de reservations a l'horizon,
        // pas de reservation aujourd'hui... etc ....
        <NoBookings />
      )}
    </div>
  );
};

export default memo(Bookings);
