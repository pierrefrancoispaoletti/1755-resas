import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Copyright from "../Copyright";
import TopAppBar from "../Small/TopAppBar";

import "../styles/app.css";
import { Divider, Message, Transition } from "semantic-ui-react";
import { useState } from "react";
import Login from "../../pages/Login";
import Bookings from "../../pages/Bookings/index";
import CallAxios from "../../database/index";
import { PushNotifications, PushNotificationSchema } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import { tokenName } from "../../_const";
import { reconnector } from "../../utils";
import { getBookings } from "../../methods";

const App = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState({});
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

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
      localStorage.removeItem(`token-${tokenName}`);
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
            response.data.message ||
            "Impossible de récupérer la configuration, contacter l'administrateur",
        });
      }
    }
    getConfig();
  }, []);

  useEffect(() => {
    if (Capacitor.getPlatform() === "android") {
      PushNotifications.addListener(
        "pushNotificationReceived",
        (PushNotificationSchema) => {
          const token = localStorage.getItem(`token-${tokenName}`);
          if (token && user) {
            setMessage({
              success: true,
              message: `Nouvelle Réservation de ${PushNotificationSchema.body}!`,
            });
            getBookings(setLoading, setBookings, setMessage, token);
          }
        }
      );

      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (ActionPerformed) => {}
      );
    }
  }, []);

  return (
    <div className="app">
      <TopAppBar user={user} loading={loading} />
      <Divider />
      <Transition
        animation="jiggle"
        duration={500}
        visible={Object.keys(message).length > 0}
      >
        <Message
          style={{
            position: "fixed",
            top: 15,
            zIndex: "1000",
            width: "100%",
          }}
          hidden={Object.keys(message).length === 0}
          success={message.success ? true : false}
          error={!message.success ? true : false}
        >
          {message.message}
        </Message>
      </Transition>
      <Switch>
        <Route exact path="/">
          <Home
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
