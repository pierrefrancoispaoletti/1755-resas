import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, useApp } from "./AppContext";

// Mock Capacitor
jest.mock("@capacitor/core", () => ({
  Capacitor: { isNativePlatform: () => false },
}));
jest.mock("@capacitor/push-notifications", () => ({
  PushNotifications: {
    requestPermissions: jest.fn(),
    register: jest.fn(),
    addListener: jest.fn(),
  },
}));
jest.mock("jwt-decode");

// Test consumer that exposes context values
const TestConsumer = () => {
  const { user, message, setUser, setMessage } = useApp();
  return (
    <div>
      <span data-testid="user">{user}</span>
      <span data-testid="message">{message.message || ""}</span>
      <button onClick={() => setUser("isAdmin")}>Set User</button>
      <button
        onClick={() => setMessage({ success: true, message: "Hello" })}
      >
        Set Message
      </button>
    </div>
  );
};

const renderWithProvider = (ui) =>
  render(<AppProvider>{ui}</AppProvider>);

describe("AppContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides default values (empty user and message)", () => {
    renderWithProvider(<TestConsumer />);
    expect(screen.getByTestId("user")).toHaveTextContent("");
    expect(screen.getByTestId("message")).toHaveTextContent("");
  });

  it("updates user when setUser is called", async () => {
    const user = userEvent.setup();
    renderWithProvider(<TestConsumer />);
    await user.click(screen.getByText("Set User"));
    expect(screen.getByTestId("user")).toHaveTextContent("isAdmin");
  });

  it("updates message when setMessage is called", async () => {
    const user = userEvent.setup();
    renderWithProvider(<TestConsumer />);
    await user.click(screen.getByText("Set Message"));
    expect(screen.getByTestId("message")).toHaveTextContent("Hello");
  });

  it("clears message automatically after 3000ms", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    renderWithProvider(<TestConsumer />);

    await user.click(screen.getByText("Set Message"));
    expect(screen.getByTestId("message")).toHaveTextContent("Hello");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("message")).toHaveTextContent("");
    jest.useRealTimers();
  });

  it("throws error if useApp is used outside AppProvider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const BadConsumer = () => {
      useApp();
      return null;
    };
    expect(() => render(<BadConsumer />)).toThrow(
      "useApp must be used within AppProvider"
    );
    consoleError.mockRestore();
  });
});
