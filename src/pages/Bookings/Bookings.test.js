import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import Bookings from "./index";
import { useApp } from "../../context/AppContext";
import { getBookings, postAdminRegistrationToken } from "../../methods";
import CallAxios from "../../database/index";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";

// ─── mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../context/AppContext", () => ({ useApp: jest.fn() }));

jest.mock("../../methods", () => ({
  getBookings: jest.fn(),
  postAdminRegistrationToken: jest.fn(),
}));

jest.mock("../../database/index", () => ({
  __esModule: true,
  default: { updateBooking: jest.fn(), deleteBooking: jest.fn() },
}));

jest.mock("@capacitor/core", () => ({
  Capacitor: { isNativePlatform: jest.fn(() => false) },
}));

jest.mock("@capacitor/push-notifications", () => ({
  PushNotifications: { removeAllDeliveredNotifications: jest.fn() },
}));

jest.mock("jwt-decode");

// Minimal mocks for child components to keep tests focused on page logic
jest.mock("../../components/Small/BookingControls", () => ({
  __esModule: true,
  default: ({ booking, handleValidateBooking, handleDeleteBooking }) => (
    <div>
      <button
        data-testid={`validate-${booking._id}`}
        onClick={() => handleValidateBooking({ ...booking }, true)}
      >
        Accept
      </button>
      <button
        data-testid={`reject-${booking._id}`}
        onClick={() => handleValidateBooking({ ...booking }, false)}
      >
        Reject
      </button>
      <button
        data-testid={`delete-${booking._id}`}
        onClick={() => handleDeleteBooking({ ...booking })}
      >
        Delete
      </button>
    </div>
  ),
}));

jest.mock("../../components/Small/BookingItem/index", () => ({
  __esModule: true,
  default: ({ bookerName }) => (
    <div data-testid="booking-item">{bookerName}</div>
  ),
}));

jest.mock("../../components/Small/FilterButtons", () => ({
  __esModule: true,
  default: ({ bookings, currentFilter }) => (
    <div data-testid="filter-buttons">
      <span data-testid="bookings-count">{bookings.length}</span>
      <span data-testid="current-filter">{currentFilter}</span>
    </div>
  ),
}));

jest.mock("../../components/Small/NoBookings", () => ({
  __esModule: true,
  default: () => <div data-testid="no-bookings">Aucune réservation</div>,
}));

// ─── helpers ─────────────────────────────────────────────────────────────────

const getTodayString = () => {
  const today = new Date();
  const dd = `0${today.getDate()}`.slice(-2);
  const mm = `0${today.getMonth() + 1}`.slice(-2);
  return `${today.getFullYear()}-${mm}-${dd}`;
};

const mockBookings = [
  {
    _id: "b1",
    bookerName: "Alice",
    bookingDate: getTodayString(),
    bookingValidatedByAdmin: null,
    bookerEmail: "alice@test.com",
    bookerNumber: "2",
    bookerPhoneNumber: "0612345678",
    bookingTime: "19:00",
  },
  {
    _id: "b2",
    bookerName: "Bob",
    bookingDate: getTodayString(),
    bookingValidatedByAdmin: true,
    bookerEmail: "bob@test.com",
    bookerNumber: "3",
    bookerPhoneNumber: "0712345678",
    bookingTime: "20:00",
  },
];

const renderBookings = () =>
  render(
    <ThemeProvider theme={theme}>
      <Bookings />
    </ThemeProvider>
  );

// ─── tests ───────────────────────────────────────────────────────────────────

describe("Bookings page", () => {
  let mockSetMessage;

  beforeEach(() => {
    mockSetMessage = jest.fn();
    useApp.mockReturnValue({
      setMessage: mockSetMessage,
      pushNotificationToken: "",
    });
    localStorage.setItem("token-resas-1755", "fake-token");

    // Default: populate bookings on mount
    getBookings.mockImplementation((setLoading, setBookings) => {
      setBookings([...mockBookings]);
    });

    Capacitor.isNativePlatform.mockReturnValue(false);

    jest.clearAllMocks();

    // Re-apply after clearAllMocks
    useApp.mockReturnValue({
      setMessage: mockSetMessage,
      pushNotificationToken: "",
    });
    getBookings.mockImplementation((setLoading, setBookings) => {
      setBookings([...mockBookings]);
    });
    Capacitor.isNativePlatform.mockReturnValue(false);
    localStorage.setItem("token-resas-1755", "fake-token");
  });

  it("renders without crashing and calls getBookings on mount", () => {
    renderBookings();
    expect(getBookings).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("filter-buttons")).toBeInTheDocument();
  });

  it("passes bookings and currentFilter to FilterButtons", () => {
    renderBookings();
    expect(screen.getByTestId("bookings-count")).toHaveTextContent("2");
    expect(screen.getByTestId("current-filter")).toHaveTextContent("0");
  });

  it("handleValidateBooking (accept): calls updateBooking with true and setMessage success", async () => {
    const updatedBooking = { ...mockBookings[0], bookingValidatedByAdmin: true };
    CallAxios.updateBooking.mockResolvedValue({
      data: { status: 200, updatedBooking, message: "Réservation acceptée" },
    });
    const user = userEvent.setup();
    renderBookings();

    await user.click(screen.getByTestId("validate-b1"));

    await waitFor(() => {
      expect(CallAxios.updateBooking).toHaveBeenCalledWith(
        expect.objectContaining({ _id: "b1", bookingValidatedByAdmin: true }),
        expect.any(String)
      );
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  it("handleValidateBooking (reject): calls updateBooking with false", async () => {
    const updatedBooking = { ...mockBookings[0], bookingValidatedByAdmin: false };
    CallAxios.updateBooking.mockResolvedValue({
      data: { status: 200, updatedBooking, message: "Réservation refusée" },
    });
    const user = userEvent.setup();
    renderBookings();

    await user.click(screen.getByTestId("reject-b1"));

    await waitFor(() => {
      expect(CallAxios.updateBooking).toHaveBeenCalledWith(
        expect.objectContaining({ _id: "b1", bookingValidatedByAdmin: false }),
        expect.any(String)
      );
    });
  });

  it("handleValidateBooking failure: calls setMessage with success:false", async () => {
    CallAxios.updateBooking.mockResolvedValue(false);
    const user = userEvent.setup();
    renderBookings();

    await user.click(screen.getByTestId("validate-b1"));

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: false })
      );
    });
  });

  it("handleDeleteBooking success: calls deleteBooking and setMessage success", async () => {
    CallAxios.deleteBooking.mockResolvedValue({
      data: { status: 200, deletedBooking: mockBookings[1], message: "Supprimée" },
    });
    const user = userEvent.setup();
    renderBookings();

    await user.click(screen.getByTestId("delete-b2"));

    await waitFor(() => {
      expect(CallAxios.deleteBooking).toHaveBeenCalledWith(
        expect.objectContaining({ _id: "b2" }),
        expect.any(String)
      );
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  it("handleDeleteBooking failure: calls setMessage with success:false", async () => {
    CallAxios.deleteBooking.mockResolvedValue(false);
    const user = userEvent.setup();
    renderBookings();

    await user.click(screen.getByTestId("delete-b1"));

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: false })
      );
    });
  });

  it("shows NoBookings when filtered list is empty", () => {
    getBookings.mockImplementation((setLoading, setBookings) => {
      setBookings([]);
    });
    renderBookings();
    expect(screen.getByTestId("no-bookings")).toBeInTheDocument();
  });

  it("does not call PushNotifications when not on native platform", () => {
    Capacitor.isNativePlatform.mockReturnValue(false);
    renderBookings();
    expect(PushNotifications.removeAllDeliveredNotifications).not.toHaveBeenCalled();
  });

  it("calls PushNotifications.removeAllDeliveredNotifications on native platform", () => {
    const jwtDecode = require("jwt-decode");
    jwtDecode.mockReturnValue({ user: { registrationKey: "old-key" } });
    Capacitor.isNativePlatform.mockReturnValue(true);
    useApp.mockReturnValue({
      setMessage: mockSetMessage,
      pushNotificationToken: "new-push-token",
    });
    renderBookings();
    expect(PushNotifications.removeAllDeliveredNotifications).toHaveBeenCalled();
  });
});
