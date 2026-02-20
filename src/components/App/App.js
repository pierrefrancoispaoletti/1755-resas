import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Box } from "@mui/material";

import Copyright from "../Copyright";
import TopAppBar from "../Small/TopAppBar";
import Toast from "../Small/Toasts";
import HomeMadeLoader from "../Small/HomeMadeLoader";

import { useApp } from "../../context/AppContext";

const Home = lazy(() => import("../../pages/Home"));
const Login = lazy(() => import("../../pages/Login"));
const Bookings = lazy(() => import("../../pages/Bookings"));

const App = () => {
  const { user, message } = useApp();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopAppBar />
      <Toast message={message} />
      <Box component="main" sx={{ flex: 1, py: 2 }}>
        <Suspense fallback={<HomeMadeLoader loading={true} />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              {!user ? <Login /> : <Redirect to="/bookings" />}
            </Route>
            <Route path="/bookings">
              {!user ? <Redirect to="/login" /> : <Bookings />}
            </Route>
          </Switch>
        </Suspense>
      </Box>
      <Copyright />
    </Box>
  );
};

export default App;
