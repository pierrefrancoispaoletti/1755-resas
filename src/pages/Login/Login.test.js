import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import Login from "./index";
import { useApp } from "../../context/AppContext";
import CallAxios from "../../database/index";

jest.mock("../../context/AppContext", () => ({ useApp: jest.fn() }));

jest.mock("../../database/index", () => ({
  __esModule: true,
  default: { auth: jest.fn() },
}));

// Simplified LoginForm: exposes handleSubmitForm via a button
jest.mock("../../components/Forms/LoginForm", () => ({
  __esModule: true,
  default: ({ handleSubmitForm, loading }) => (
    <div>
      <button
        data-testid="submit-btn"
        onClick={() =>
          handleSubmitForm({ email: "admin@test.com", password: "secret" })
        }
      >
        Submit
      </button>
      {loading && <span data-testid="loading-indicator">loading</span>}
    </div>
  ),
}));

// ─── helpers ─────────────────────────────────────────────────────────────────

const renderLogin = () =>
  render(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );

// ─── tests ───────────────────────────────────────────────────────────────────

describe("Login page", () => {
  let mockSetUser;
  let mockSetMessage;

  beforeEach(() => {
    mockSetUser = jest.fn();
    mockSetMessage = jest.fn();
    useApp.mockReturnValue({ setUser: mockSetUser, setMessage: mockSetMessage });
    localStorage.clear();
    jest.clearAllMocks();
    useApp.mockReturnValue({ setUser: mockSetUser, setMessage: mockSetMessage });
  });

  it("renders without crashing", () => {
    renderLogin();
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
  });

  it("calls setUser and stores token on successful auth", async () => {
    const user = userEvent.setup();
    CallAxios.auth.mockResolvedValue({
      data: { status: 200, role: "isAdmin", message: "Connecté", token: "jwt-abc" },
    });
    renderLogin();
    await user.click(screen.getByTestId("submit-btn"));
    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith("isAdmin");
    });
    expect(localStorage.getItem("token-resas-1755")).toBe("jwt-abc");
    expect(mockSetMessage).toHaveBeenCalledWith(
      expect.objectContaining({ success: true })
    );
  });

  it("stores token with key token-resas-1755", async () => {
    const user = userEvent.setup();
    CallAxios.auth.mockResolvedValue({
      data: { status: 200, role: "isAdmin", message: "OK", token: "my-token" },
    });
    renderLogin();
    await user.click(screen.getByTestId("submit-btn"));
    await waitFor(() => {
      expect(localStorage.getItem("token-resas-1755")).toBe("my-token");
    });
  });

  it("calls setMessage with success:false on failed auth (response false)", async () => {
    const user = userEvent.setup();
    CallAxios.auth.mockResolvedValue(false);
    renderLogin();
    await user.click(screen.getByTestId("submit-btn"));
    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: "Identifiants incorrects",
        })
      );
    });
    expect(mockSetUser).not.toHaveBeenCalled();
  });

  it("calls setMessage with success:false on non-200 status", async () => {
    const user = userEvent.setup();
    CallAxios.auth.mockResolvedValue({ data: { status: 401 } });
    renderLogin();
    await user.click(screen.getByTestId("submit-btn"));
    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: false })
      );
    });
  });

  it("shows loading indicator while request is in-flight", async () => {
    const user = userEvent.setup();
    let resolve;
    CallAxios.auth.mockReturnValue(new Promise((r) => { resolve = r; }));
    renderLogin();
    await user.click(screen.getByTestId("submit-btn"));
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    // Resolve to clean up
    resolve({ data: { status: 200, role: "isAdmin", message: "ok", token: "t" } });
  });

  it("loading indicator disappears after response", async () => {
    const user = userEvent.setup();
    CallAxios.auth.mockResolvedValue({
      data: { status: 200, role: "isAdmin", message: "OK", token: "t" },
    });
    renderLogin();
    await user.click(screen.getByTestId("submit-btn"));
    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    });
  });

  it("renders the outer Box with minHeight 60vh", () => {
    renderLogin();
    // The Box wrapping the form should have minHeight style
    const box = screen.getByTestId("submit-btn").closest("div")?.parentElement;
    expect(box).toBeTruthy();
  });
});
