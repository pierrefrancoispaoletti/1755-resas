import React, { createContext, useContext, useState, useEffect } from "react";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import { tokenName } from "../_const";
import { reconnector } from "../utils";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState({});
  const [pushNotificationToken, setPushNotificationToken] = useState("");

  // Auto-clear message after 3s
  useEffect(() => {
    if (Object.keys(message).length !== 0) {
      const timer = setTimeout(() => {
        setMessage({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Auto-reconnect on mount
  useEffect(() => {
    const token = localStorage.getItem(`token-${tokenName}`);
    if (token && reconnector(token, setUser)) {
      setMessage({
        success: true,
        message: "Re-Connécté",
      });
    } else {
      setUser("");
      localStorage.removeItem(`token-${tokenName}`);
    }
  }, []);

  // Push notifications (native only)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      PushNotifications.requestPermissions().then((result) => {
        if (result.receive === "granted") {
          PushNotifications.register();
        }
      });

      PushNotifications.addListener("registration", (Token) => {
        setPushNotificationToken(Token.value);
      });

      PushNotifications.addListener("registrationError", () => {});
      PushNotifications.addListener("pushNotificationReceived", () => {});
      PushNotifications.addListener("pushNotificationActionPerformed", () => {});
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        message,
        setMessage,
        pushNotificationToken,
        setPushNotificationToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

export default AppContext;
