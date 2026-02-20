import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBookingForm from "./index";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";

// Get future date string
const getFutureDateStr = (offsetDays = 1) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
};

const defaultBooking = {
  bookerName: "",
  bookerEmail: "",
  bookerPhoneNumber: "",
  bookerNumber: "",
  bookingDate: getFutureDateStr(1),
  bookingTime: "19:00",
};

const defaultProps = {
  handleSubmit: jest.fn(),
  setBooking: jest.fn(),
  booking: defaultBooking,
  loading: false,
};

const renderForm = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <AddBookingForm {...defaultProps} {...props} />
    </ThemeProvider>
  );

describe("AddBookingForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all required form fields", () => {
    renderForm();
    expect(screen.getByLabelText(/Votre nom/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numéro de téléphone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre de personnes/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de votre réservation/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Heure de votre réservation/)).toBeInTheDocument();
  });

  it("submit button is disabled when form is empty", () => {
    const emptyBooking = { ...defaultBooking, bookingDate: "", bookingTime: "" };
    renderForm({ booking: emptyBooking });
    expect(screen.getByRole("button", { name: /Je Réserve/i })).toBeDisabled();
  });

  it("shows error for invalid email format", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/Votre Email/), "not-an-email");
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText(/Format d'email invalide/)).toBeInTheDocument();
    });
  });

  it("shows error for invalid phone number format", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/Numéro de téléphone/), "123");
    await user.tab();
    await waitFor(() => {
      expect(screen.getByText(/Format: 06 12 34 56 78/)).toBeInTheDocument();
    });
  });

  it("shows error when booking time is before 18:00", async () => {
    const user = userEvent.setup();
    const earlyBooking = { ...defaultBooking, bookingTime: "12:00" };
    renderForm({ booking: earlyBooking });

    const timeField = screen.getByLabelText(/Heure de votre réservation/);
    await user.clear(timeField);
    await user.type(timeField, "12:00");
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/après 18h00/)
      ).toBeInTheDocument();
    });
  });

  it("disables submit button when loading", () => {
    renderForm({ loading: true });
    expect(
      screen.getByRole("button", { name: /Réservation en cours/i })
    ).toBeDisabled();
  });

  it("calls handleSubmit with form data on valid submission", async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    renderForm({ handleSubmit });

    await user.type(screen.getByLabelText(/Votre nom/), "Marie Curie");
    await user.type(
      screen.getByLabelText(/Votre Email/),
      "marie@example.com"
    );
    await user.type(
      screen.getByLabelText(/Numéro de téléphone/),
      "0612345678"
    );
    await user.type(screen.getByLabelText(/Nombre de personnes/), "2");

    const submitButton = screen.getByRole("button", { name: /Je Réserve/i });
    await waitFor(() => expect(submitButton).not.toBeDisabled());
    await user.click(submitButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          bookerName: "Marie Curie",
          bookerEmail: "marie@example.com",
          bookerNumber: 2,
        })
      );
    });
  });

  it("shows name validation error when name is too short", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/Votre nom/), "A");
    await user.tab();
    await waitFor(() => {
      expect(
        screen.getByText(/au moins 2 caractères/)
      ).toBeInTheDocument();
    });
  });
});
