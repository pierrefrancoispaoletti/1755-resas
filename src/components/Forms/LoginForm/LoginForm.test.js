import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./index";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";

const defaultProps = {
  handleSubmitForm: jest.fn(),
  credentials: { email: "", password: "" },
  setCredentials: jest.fn(),
  loading: false,
};

const renderLoginForm = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <LoginForm {...defaultProps} {...props} />
    </ThemeProvider>
  );

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders email and password fields", () => {
    renderLoginForm();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderLoginForm();
    expect(
      screen.getByRole("button", { name: /Se connecter/i })
    ).toBeInTheDocument();
  });

  it("submit button is disabled when form is empty", () => {
    renderLoginForm();
    expect(screen.getByRole("button", { name: /Se connecter/i })).toBeDisabled();
  });

  it("shows email validation error for invalid email format", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    const emailField = screen.getByLabelText(/Email/);
    await user.type(emailField, "invalid-email");
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText(/Format d'email invalide/)).toBeInTheDocument();
    });
  });

  it("shows password validation error when password is too short", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    const passwordField = screen.getByLabelText(/Mot de passe/);
    await user.type(passwordField, "123");
    await user.tab();
    await waitFor(() => {
      expect(
        screen.getByText(/au moins 6 caractères/)
      ).toBeInTheDocument();
    });
  });

  it("toggles password visibility when eye icon is clicked", async () => {
    const user = userEvent.setup();
    renderLoginForm();
    const passwordField = screen.getByLabelText(/Mot de passe/);
    expect(passwordField).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", {
      name: /Afficher le mot de passe/i,
    });
    await user.click(toggleButton);
    expect(passwordField).toHaveAttribute("type", "text");

    await user.click(
      screen.getByRole("button", { name: /Masquer le mot de passe/i })
    );
    expect(passwordField).toHaveAttribute("type", "password");
  });

  it("calls handleSubmitForm when form is valid and submitted", async () => {
    const handleSubmitForm = jest.fn();
    const user = userEvent.setup();
    renderLoginForm({ handleSubmitForm });

    await user.type(screen.getByLabelText(/Email/), "admin@example.com");
    await user.type(screen.getByLabelText(/Mot de passe/), "password123");

    const submitButton = screen.getByRole("button", { name: /Se connecter/i });
    await waitFor(() => expect(submitButton).not.toBeDisabled());
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSubmitForm).toHaveBeenCalledWith({
        email: "admin@example.com",
        password: "password123",
      });
    });
  });

  it("disables all fields when loading is true", () => {
    renderLoginForm({ loading: true });
    expect(screen.getByLabelText(/Email/)).toBeDisabled();
    expect(screen.getByLabelText(/Mot de passe/)).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /Connexion en cours/i })
    ).toBeDisabled();
  });
});
