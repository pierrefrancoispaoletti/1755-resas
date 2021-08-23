import React, { useEffect, useState } from "react";

// react router
import { Redirect, Route, Switch } from "react-router-dom";

//components
import Copyright from "../Copyright";
import TopAppBar from "../Small/TopAppBar";
import Toast from "../Small/Toasts";

//semantic
import { Divider } from "semantic-ui-react";

//pages
import Login from "../../pages/Login";
import Bookings from "../../pages/Bookings/index";
import Home from "../../pages/Home";

// database
import CallAxios from "../../database/index";

//capacitor
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";

//const
import { tokenName } from "../../_const";

//utils
import { reconnector } from "../../utils";
import { logout } from "../../utils/index";

//styles
import "../styles/app.css";

const App = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState({});
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [pushNotificationToken, setPushNotificationToken] = useState("");

  useEffect(() => {
    if (Object.keys(message).length !== 0) {
      setTimeout(() => {
        setMessage({});
      }, 3000);
    }
  }, [message]);

  useEffect(() => {
    const token = localStorage.getItem(`token-${tokenName}`);
    if (token && reconnector(token, setUser)) {
      setMessage({
        success: true,
        message: "Re-Connécté",
      });
    } else {
      logout(setUser, setMessage);
    }

    async function getConfig() {
      setLoading(true);
      const response = await CallAxios.getConfig();

      if (response && response.data.status === 200) {
        setConfig(response.data.config);
        setLoading(false);
      } else {
        setLoading(false);
        setMessage({
          success: false,
          message:
            "Impossible de récupérer la configuration, contacter l'administrateur",
        });
      }
    }
    getConfig();
  }, []);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === "granted") {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          return;
        }
      });

      PushNotifications.addListener("registration", (Token) => {
        setPushNotificationToken(Token.value);
      });

      PushNotifications.addListener("registrationError", (error) => {});

      PushNotifications.addListener(
        "pushNotificationReceived",
        (PushNotificationSchema) => {}
      );

      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (ActionPerformed) => {}
      );
    }
  }, []);

  return (
    <div className="app">
      <TopAppBar
        user={user}
        loading={loading}
        setUser={setUser}
        setMessage={setMessage}
      />
      <Divider />
      <Toast message={message} />
      <Switch>
        <Route exact path="/">
          <Home
            pushNotificationToken={pushNotificationToken}
            setPushNotificationToken={setPushNotificationToken}
            user={user}
            message={message}
            setMessage={setMessage}
            resaOpen={config.resaOpen}
            config={config}
            setConfig={setConfig}
          />
        </Route>
        <Route path="/login">
          {!user ? (
            <Login setUser={setUser} setMessage={setMessage} />
          ) : (
            <Redirect to="/bookings" />
          )}
        </Route>
        <Route path="/bookings">
          {!user ? (
            <Redirect to="/login" />
          ) : (
            <Bookings
              setUser={setUser}
              pushNotificationToken={pushNotificationToken}
              setMessage={setMessage}
              bookings={bookings}
              setBookings={setBookings}
            />
          )}
        </Route>
      </Switch>
      <Divider />
      <Copyright />
    </div>
  );
};

export default App;
