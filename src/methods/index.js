import CallAxios from "../database";

export async function getBookings(
  loadingFunc,
  bookingFunc,
  messageFunc,
  token
) {
  loadingFunc(true);
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
    bookingFunc([...bookings]);
    loadingFunc(false);
    messageFunc({ success: true, message: message });
  } else {
    loadingFunc(false);
    messageFunc({ success: false, message: "Il y a eu un probléme" });
  }
}


export async function postAdminRegistrationToken(jwtToken, regId) {
    await CallAxios.postAdminRegistrationToken(jwtToken, regId);
}