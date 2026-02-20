import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import QueryProvider from "./context/QueryProvider";
import { AppProvider } from "./context/AppContext";
import { ConfigProvider } from "./context/ConfigContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <ConfigProvider>
          <Router basename="/">
            <App />
          </Router>
        </ConfigProvider>
      </AppProvider>
    </ThemeProvider>
  </QueryProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
