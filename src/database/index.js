import axios from "axios";
import { $SERVER } from "../_const";

class CallAxios {
  //regToken
  static postAdminRegistrationToken = async (token, registrationKey) => {
    try {
      const response = await axios({
        method: "post",
        url: `${$SERVER}/api/bookings/registrationToken`,
        data: { registrationKey },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  //bookings

  static getAllBookings = async (token) => {
    try {
      const response = await axios({
        method: "get",
        url: `${$SERVER}/api/bookings/allBookings`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  static postBooking = async (booking, pushNotificationToken) => {
    if (!booking) {
      return false;
    }

    try {
      const response = await axios({
        method: "post",
        url: `${$SERVER}/api/bookings/createBooking`,
        data: { booking: booking, pushNotificationToken },
      });
      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  static updateBooking = async (update, token) => {
    if (!update) {
      return false;
    }

    try {
      const response = await axios({
        method: "post",
        url: `${$SERVER}/api/bookings/updateBooking`,
        data: { update },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  static deleteBooking = async (update, token) => {
    if (!update) {
      return false;
    }

    try {
      const response = await axios({
        method: "delete",
        url: `${$SERVER}/api/bookings/deleteBooking`,
        data: { update },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  //config

  static getConfig = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${$SERVER}/api/config/getConfig`,
      });

      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  static updateConfig = async (update, token) => {
    if (!update) {
      return false;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${$SERVER}/api/config/updateConfig`,
        data: { update },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  //auth

  static auth = async (credentials) => {
    if (!credentials) {
      return false;
    }
    const { email, password } = credentials;

    try {
      const response = await axios({
        method: "post",
        url: `${$SERVER}/auth/login`,
        data: { email, password },
      });

      if (response) {
        return response;
      }
    } catch (error) {
      return false;
    }
  };
}

export default CallAxios;
