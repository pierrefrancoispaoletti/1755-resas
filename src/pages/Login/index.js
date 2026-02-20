import React, { useState } from "react";
import { Box } from "@mui/material";
import CallAxios from "../../database/index";
import { tokenName } from "../../_const";
import LoginForm from "../../components/Forms/LoginForm";
import { useApp } from "../../context/AppContext";

const Login = () => {
  const { setUser, setMessage } = useApp();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (data) => {
    const loginData = data || credentials;
    setLoading(true);
    const response = await CallAxios.auth(loginData);
    if (response && response.data.status === 200) {
      const { role, message, token } = response.data;
      setMessage({
        success: true,
        message: message,
      });
      setLoading(false);
      localStorage.setItem(`token-${tokenName}`, token);
      setUser(role);
    } else {
      setLoading(false);
      setMessage({
        success: false,
        message: "Identifiants incorrects",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        pt: { xs: 3, sm: 6 },
        px: 2,
        minHeight: "60vh",
      }}
    >
      <LoginForm
        handleSubmitForm={handleSubmitForm}
        credentials={credentials}
        setCredentials={setCredentials}
        loading={loading}
      />
    </Box>
  );
};

export default Login;
