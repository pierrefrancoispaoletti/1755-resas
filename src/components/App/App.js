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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
//styles
import "../styles/app.css";

const firebaseConfig = {
  apiKey: "AIzaSyBnnmKiorC6eUkSse-IhvGXRqZYaSeqKuQ",
  authDomain: "resas-d1707.firebaseapp.com",
  projectId: "resas-d1707",
  storageBucket: "resas-d1707.appspot.com",
  messagingSenderId: "813260370146",
  appId: "1:813260370146:web:33100c33ab25467412aebb",
  measurementId: "G-V5QZPQFCGQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
    } else {
      Notification.requestPermission((status) => console.log(status));
      const messaging = getMessaging();
      getToken(messaging, {
        vapidKey:
          "BJhj1DTPykIbZTL6P3a2TrfgdBds5tzf14VqYqL-powIJjOHE31_0hwOtdmUTrAkDMIE0LT5CDsXk9AsFOt4j7I",
      })
        .then((currentToken) => {
          if (currentToken) {
            setPushNotificationToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
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
