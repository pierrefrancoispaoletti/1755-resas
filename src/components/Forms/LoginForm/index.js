import React from "react";
import { Button, Form } from "semantic-ui-react";
import { getFieldValue } from "../../../utils";

const LoginForm = ({
  handleSubmitForm,
  credentials,
  setCredentials,
  loading,
}) => {
  return (
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
  );
};

export default LoginForm;
