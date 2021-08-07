import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useState } from "react";
import { getFieldValue } from "../../utils/index";
import CallAxios from "../../database/index";
import { tokenName } from "../../_const";

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
      <Form onSubmit={handleSubmitForm}>
        <Form.Field required error={!credentials.email}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={(e) => getFieldValue(e, setCredentials, credentials)}
          />
        </Form.Field>
        <Form.Field required error={!credentials.password}>
          <label htmlFor="">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) => getFieldValue(e, setCredentials, credentials)}
          />
        </Form.Field>
        <Form.Field>
          <Button
            size="massive"
            loading={loading}
            disabled={loading || !credentials.email || !credentials.password}
            color="blue"
            type="submit"
            content="Connexion"
          />
        </Form.Field>
      </Form>
    </div>
  );
};

export default Login;
