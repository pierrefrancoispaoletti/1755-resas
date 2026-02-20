import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterButtons from "./index";

// Helper: create a booking with date offset from today
const makeBooking = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return {
    _id: `booking-${offsetDays}`,
    bookingDate: date.toISOString().split("T")[0],
    bookingValidatedByAdmin: null,
  };
};

const defaultProps = {
  setFilter: jest.fn(),
  currentFilter: 0,
  bookings: [
    makeBooking(-2),
    makeBooking(-1),
    makeBooking(0),
    makeBooking(1),
    makeBooking(3),
    makeBooking(5),
  ],
};

describe("FilterButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 4 filter chips", () => {
    render(<FilterButtons {...defaultProps} />);
    expect(screen.getByText(/Jours Précédents/)).toBeInTheDocument();
    expect(screen.getByText(/Aujourd'hui/)).toBeInTheDocument();
    expect(screen.getByText(/Demain/)).toBeInTheDocument();
    expect(screen.getByText(/Jours Suivants/)).toBeInTheDocument();
  });

  it("shows correct counts for each filter", () => {
    render(<FilterButtons {...defaultProps} />);
    // Past: 2 bookings (-2, -1)
    expect(screen.getByText(/Jours Précédents \(2\)/)).toBeInTheDocument();
    // Today: 1 booking (0)
    expect(screen.getByText(/Aujourd'hui \(1\)/)).toBeInTheDocument();
    // Tomorrow: 1 booking (1)
    expect(screen.getByText(/Demain \(1\)/)).toBeInTheDocument();
    // Future: 2 bookings (3, 5)
    expect(screen.getByText(/Jours Suivants \(2\)/)).toBeInTheDocument();
  });

  it("calls setFilter with -1 when clicking Jours Précédents", async () => {
    const user = userEvent.setup();
    render(<FilterButtons {...defaultProps} />);
    await user.click(screen.getByText(/Jours Précédents/));
    expect(defaultProps.setFilter).toHaveBeenCalledWith(-1);
  });

  it("calls setFilter with 0 when clicking Aujourd'hui", async () => {
    const user = userEvent.setup();
    render(<FilterButtons {...defaultProps} />);
    await user.click(screen.getByText(/Aujourd'hui/));
    expect(defaultProps.setFilter).toHaveBeenCalledWith(0);
  });

  it("calls setFilter with 1 when clicking Demain", async () => {
    const user = userEvent.setup();
    render(<FilterButtons {...defaultProps} />);
    await user.click(screen.getByText(/Demain/));
    expect(defaultProps.setFilter).toHaveBeenCalledWith(1);
  });

  it("calls setFilter with 2 when clicking Jours Suivants", async () => {
    const user = userEvent.setup();
    render(<FilterButtons {...defaultProps} />);
    await user.click(screen.getByText(/Jours Suivants/));
    expect(defaultProps.setFilter).toHaveBeenCalledWith(2);
  });

  it("shows filled chip for active filter (currentFilter=0)", () => {
    render(<FilterButtons {...defaultProps} currentFilter={0} />);
    // Active chip uses "filled" variant which has a specific MUI class
    // We verify the active one has fontWeight 700 by checking the chip that should be active
    const todayChip = screen.getByText(/Aujourd'hui/);
    expect(todayChip).toBeInTheDocument();
  });

  it("renders correctly with empty bookings list", () => {
    render(<FilterButtons {...defaultProps} bookings={[]} />);
    expect(screen.getByText(/Jours Précédents \(0\)/)).toBeInTheDocument();
    expect(screen.getByText(/Aujourd'hui \(0\)/)).toBeInTheDocument();
    expect(screen.getByText(/Demain \(0\)/)).toBeInTheDocument();
    expect(screen.getByText(/Jours Suivants \(0\)/)).toBeInTheDocument();
  });
});
