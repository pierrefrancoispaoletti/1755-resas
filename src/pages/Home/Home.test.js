import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import Home from "./index";
import { useApp } from "../../context/AppContext";
import { useConfig } from "../../context/ConfigContext";
import CallAxios from "../../database/index";

jest.mock("../../context/AppContext", () => ({ useApp: jest.fn() }));
jest.mock("../../context/ConfigContext", () => ({ useConfig: jest.fn() }));

jest.mock("../../database/index", () => ({
  __esModule: true,
  default: { postBooking: jest.fn(), updateConfig: jest.fn() },
}));

// AddBookingForm mock: exposes a submit button that calls handleSubmit with a sample booking
jest.mock("../../components/Forms/AddBooking-form", () => ({
  __esModule: true,
  default: ({ handleSubmit }) => (
    <button
      data-testid="add-booking-submit"
      onClick={() =>
        handleSubmit({
          bookerName: "Alice",
          bookerEmail: "alice@test.com",
          bookerNumber: "2",
          bookerPhoneNumber: "0612345678",
          bookingDate: "2026-05-01",
          bookingTime: "19:00",
        })
      }
    >
      Submit Résa
    </button>
  ),
}));

// ─── helpers ─────────────────────────────────────────────────────────────────

const renderHome = () =>
  render(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );

const makeAppContext = (overrides = {}) => ({
  user: "",
  setMessage: jest.fn(),
  pushNotificationToken: "",
  ...overrides,
});

const makeConfigContext = (overrides = {}) => ({
  config: { resaOpen: true, _id: "cfg-1" },
  loading: false,
  setConfig: jest.fn(),
  ...overrides,
});

// ─── tests ───────────────────────────────────────────────────────────────────

describe("Home page", () => {
  beforeEach(() => {
    useApp.mockReturnValue(makeAppContext());
    useConfig.mockReturnValue(makeConfigContext());
    localStorage.setItem("token-resas-1755", "fake-token");
    jest.clearAllMocks();
    useApp.mockReturnValue(makeAppContext());
    useConfig.mockReturnValue(makeConfigContext());
    localStorage.setItem("token-resas-1755", "fake-token");
  });

  it("renders without crashing when resaOpen is true", () => {
    renderHome();
    expect(screen.getByTestId("add-booking-submit")).toBeInTheDocument();
  });

  it("shows 'réservations désactivées' paper when resaOpen is false", () => {
    useConfig.mockReturnValue(makeConfigContext({ config: { resaOpen: false, _id: "cfg-1" } }));
    renderHome();
    expect(
      screen.getByText(/Les réservations sont désactivées/i)
    ).toBeInTheDocument();
    expect(screen.queryByTestId("add-booking-submit")).not.toBeInTheDocument();
  });

  it("shows HomeMadeLoader while submit is in-flight", async () => {
    let resolveBooking;
    CallAxios.postBooking.mockReturnValue(
      new Promise((r) => { resolveBooking = r; })
    );
    const user = userEvent.setup();
    renderHome();
    user.click(screen.getByTestId("add-booking-submit")); // don't await
    // Loader should appear while awaiting
    await waitFor(() => {
      expect(screen.getByText("CHARGEMENT...")).toBeInTheDocument();
    });
    // Clean up
    resolveBooking({ data: { status: 200, message: "OK" } });
  });

  it("handleSubmit success: setMessage called with success:true and form hidden", async () => {
    const mockSetMessage = jest.fn();
    useApp.mockReturnValue(makeAppContext({ setMessage: mockSetMessage }));
    CallAxios.postBooking.mockResolvedValue({
      data: { status: 200, message: "Réservation enregistrée" },
    });
    const user = userEvent.setup();
    renderHome();

    await user.click(screen.getByTestId("add-booking-submit"));

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
    // EmptyFormButton (Recharger) appears after success
    expect(screen.getByText("Recharger")).toBeInTheDocument();
  });

  it("handleSubmit failure: setMessage called with success:false and error set", async () => {
    const mockSetMessage = jest.fn();
    useApp.mockReturnValue(makeAppContext({ setMessage: mockSetMessage }));
    CallAxios.postBooking.mockResolvedValue(false);
    const user = userEvent.setup();
    renderHome();

    await user.click(screen.getByTestId("add-booking-submit"));

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: false })
      );
    });
    expect(screen.getByText("Recharger")).toBeInTheDocument();
  });

  it("appends pushNotificationToken to bookingData when present", async () => {
    useApp.mockReturnValue(makeAppContext({ pushNotificationToken: "push-tok-123" }));
    CallAxios.postBooking.mockResolvedValue({
      data: { status: 200, message: "OK" },
    });
    const user = userEvent.setup();
    renderHome();

    await user.click(screen.getByTestId("add-booking-submit"));

    await waitFor(() => {
      expect(CallAxios.postBooking).toHaveBeenCalledWith(
        expect.objectContaining({ pushNotificationToken: "push-tok-123" })
      );
    });
  });

  it("handleEmptyForm: resets form (submit button visible again)", async () => {
    const mockSetMessage = jest.fn();
    useApp.mockReturnValue(makeAppContext({ setMessage: mockSetMessage }));
    CallAxios.postBooking.mockResolvedValue({
      data: { status: 200, message: "OK" },
    });
    const user = userEvent.setup();
    renderHome();

    // Submit to trigger success state
    await user.click(screen.getByTestId("add-booking-submit"));
    await waitFor(() => {
      expect(screen.getByText("Recharger")).toBeInTheDocument();
    });

    // Click Recharger (EmptyFormButton)
    await user.click(screen.getByText("Recharger"));

    // Form submit button should reappear
    expect(screen.getByTestId("add-booking-submit")).toBeInTheDocument();
  });

  it("handleChangeResaOpen success: calls setConfig and setMessage", async () => {
    const mockSetConfig = jest.fn();
    const mockSetMessage = jest.fn();
    useApp.mockReturnValue(makeAppContext({ user: "isAdmin", setMessage: mockSetMessage }));
    useConfig.mockReturnValue(
      makeConfigContext({
        config: { resaOpen: true, _id: "cfg-1" },
        setConfig: mockSetConfig,
      })
    );
    const updatedConfig = { resaOpen: false, _id: "cfg-1" };
    CallAxios.updateConfig.mockResolvedValue({
      data: { status: 200, updatedConfig, message: "Mis à jour" },
    });
    const user = userEvent.setup();
    renderHome();

    // Click the switch (BookingSwitch rendered as admin)
    const switchEl = screen.getByRole("switch");
    await user.click(switchEl);

    await waitFor(() => {
      expect(mockSetConfig).toHaveBeenCalledWith(updatedConfig);
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: true })
      );
    });
  });

  it("handleChangeResaOpen failure: calls setMessage with success:false", async () => {
    const mockSetMessage = jest.fn();
    useApp.mockReturnValue(makeAppContext({ user: "isAdmin", setMessage: mockSetMessage }));
    useConfig.mockReturnValue(makeConfigContext({ config: { resaOpen: true, _id: "cfg-1" } }));
    CallAxios.updateConfig.mockResolvedValue(false);
    const user = userEvent.setup();
    renderHome();

    const switchEl = screen.getByRole("switch");
    await user.click(switchEl);

    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: false })
      );
    });
  });

  it("BookingSwitch is shown only for admin users", () => {
    useApp.mockReturnValue(makeAppContext({ user: "isAdmin" }));
    renderHome();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("BookingSwitch is not shown for non-admin users", () => {
    useApp.mockReturnValue(makeAppContext({ user: "" }));
    renderHome();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
  });
});
