import axios from "axios";
import { $SERVER } from "../_const";

class CallAxios {
  //bookings
  static postBooking = async (booking) => {
    if (!booking) {
      return false;
    }

    try {
      const response = await axios({
        method: "post",
        url: `${$SERVER}/api/bookings/createBooking`,
        data: { booking: booking },
      });
      if (response) {
        return response;
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
      }
    } catch (error) {
      return false;
    }
  };
}

export default CallAxios;
