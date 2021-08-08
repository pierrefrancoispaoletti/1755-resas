import React from "react";
import { useState } from "react";
import CallAxios from "../../database/index";
import { tokenName } from "../../_const";
import LoginForm from "../../components/Forms/LoginForm";

const Login = ({ setUser, setMessage }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await CallAxios.auth(credentials);
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
        message: response.data.message || "Identifiants incorrects",
      });
    }
  };
  return (
    <div className="home">
      <LoginForm
        handleSubmitForm={handleSubmitForm}
        credentials={credentials}
        setCredentials={setCredentials}
        loading={loading}
      />
    </div>
  );
};

export default Login;
