import React from "react";
import { render, screen } from "@testing-library/react";
import BookingItem from "./index";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";

const defaultProps = {
  bookerName: "Jean Dupont",
  bookerEmail: "jean.dupont@example.com",
  bookerNumber: 4,
  bookerPhoneNumber: "06 12 34 56 78",
  bookingDate: new Date().toISOString().split("T")[0],
  bookingTime: "19:30",
  bookingValidatedByAdmin: null,
};

const renderBookingItem = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <BookingItem {...defaultProps} {...props} />
    </ThemeProvider>
  );

describe("BookingItem", () => {
  it('shows "New !" chip when bookingValidatedByAdmin is null', () => {
    renderBookingItem({ bookingValidatedByAdmin: null });
    expect(screen.getByText("New !")).toBeInTheDocument();
  });

  it('shows "Acceptée" chip when bookingValidatedByAdmin is true', () => {
    renderBookingItem({ bookingValidatedByAdmin: true });
    expect(screen.getByText("Acceptée")).toBeInTheDocument();
  });

  it('shows "Refusée" chip when bookingValidatedByAdmin is false', () => {
    renderBookingItem({ bookingValidatedByAdmin: false });
    expect(screen.getByText("Refusée")).toBeInTheDocument();
  });

  it("renders the booker name", () => {
    renderBookingItem();
    expect(screen.getByText("Jean Dupont")).toBeInTheDocument();
  });

  it('renders the phone link with tel: protocol', () => {
    renderBookingItem();
    const phoneLink = screen.getByRole("link", { name: /Appeler Jean Dupont/ });
    expect(phoneLink).toHaveAttribute("href", "tel:06 12 34 56 78");
  });

  it('renders the email link with mailto: protocol', () => {
    renderBookingItem();
    const emailLink = screen.getByRole("link", {
      name: /Envoyer un email à Jean Dupont/,
    });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:jean.dupont@example.com"
    );
  });

  it('uses "personne" (singular) when bookerNumber is 1', () => {
    const { container } = renderBookingItem({ bookerNumber: 1 });
    expect(container).toHaveTextContent("1 personne");
    expect(container).not.toHaveTextContent("personnes");
  });

  it('uses "personnes" (plural) when bookerNumber is more than 1', () => {
    const { container } = renderBookingItem({ bookerNumber: 4 });
    expect(container).toHaveTextContent("4 personnes");
  });

  it("displays booking time", () => {
    renderBookingItem();
    expect(screen.getByText("19:30")).toBeInTheDocument();
  });

  it("displays email in contact info section", () => {
    renderBookingItem();
    expect(screen.getByText("jean.dupont@example.com")).toBeInTheDocument();
  });

  it("displays phone number in contact info section", () => {
    renderBookingItem();
    expect(screen.getByText("06 12 34 56 78")).toBeInTheDocument();
  });
});
