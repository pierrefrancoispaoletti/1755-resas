import { calculateDate, bookingsFilter, reconnector, logout } from "./index";
import { tokenName } from "../_const";

jest.mock("jwt-decode");

const jwtDecode = require("jwt-decode");

// Helper: get ISO date string offset from today
const getDateStr = (offsetDays) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
};

// Helper: create a booking with a date at given offset
const makeBooking = (offsetDays) => ({
  _id: `id-${offsetDays}`,
  bookingDate: getDateStr(offsetDays),
  bookingValidatedByAdmin: null,
});

describe("calculateDate", () => {
  it("returns [0, \"Aujourd'hui\"] for today", () => {
    const result = calculateDate(getDateStr(0));
    expect(result[0]).toBe(0);
    expect(result[1]).toBe("Aujourd'hui");
  });

  it('returns [1, "Demain"] for tomorrow', () => {
    const result = calculateDate(getDateStr(1));
    expect(result[0]).toBe(1);
    expect(result[1]).toBe("Demain");
  });

  it("returns [-1, ...] for past dates (yesterday)", () => {
    const result = calculateDate(getDateStr(-1));
    expect(result[0]).toBe(-1);
    expect(result[1]).toBe("Il y à 1 jours");
  });

  it("returns [-1, ...] for past dates (3 days ago)", () => {
    const result = calculateDate(getDateStr(-3));
    expect(result[0]).toBe(-1);
    expect(result[1]).toBe("Il y à 3 jours");
  });

  it("returns [2, ...] for future dates beyond tomorrow", () => {
    const result = calculateDate(getDateStr(5));
    expect(result[0]).toBe(2);
    expect(result[1]).toBe("Dans 5 jours");
  });
});

describe("bookingsFilter", () => {
  const bookings = [
    makeBooking(-2),
    makeBooking(-1),
    makeBooking(0),
    makeBooking(1),
    makeBooking(3),
    makeBooking(5),
  ];

  it("filters past bookings (filter -1)", () => {
    const result = bookingsFilter(bookings, calculateDate, -1);
    expect(result).toHaveLength(2);
    result.forEach((b) => expect(calculateDate(b.bookingDate)[0]).toBe(-1));
  });

  it("filters today's bookings (filter 0)", () => {
    const result = bookingsFilter(bookings, calculateDate, 0);
    expect(result).toHaveLength(1);
    expect(calculateDate(result[0].bookingDate)[0]).toBe(0);
  });

  it("filters tomorrow's bookings (filter 1)", () => {
    const result = bookingsFilter(bookings, calculateDate, 1);
    expect(result).toHaveLength(1);
    expect(calculateDate(result[0].bookingDate)[0]).toBe(1);
  });

  it("filters future bookings beyond tomorrow (filter 2)", () => {
    const result = bookingsFilter(bookings, calculateDate, 2);
    expect(result).toHaveLength(2);
    result.forEach((b) => expect(calculateDate(b.bookingDate)[0]).toBe(2));
  });

  it("returns empty array when no bookings match", () => {
    const result = bookingsFilter([], calculateDate, 0);
    expect(result).toHaveLength(0);
  });
});

describe("reconnector", () => {
  it("returns false for null token", () => {
    expect(reconnector(null, jest.fn())).toBe(false);
  });

  it("returns false for empty string token", () => {
    expect(reconnector("", jest.fn())).toBe(false);
  });

  it("calls logUserFunction and returns true for valid non-expired token", () => {
    const setUser = jest.fn();
    const futureExp = Math.floor(Date.now() / 1000) + 3600;
    jwtDecode.default.mockReturnValue({
      user: { role: "isAdmin" },
      exp: futureExp,
    });

    const result = reconnector("valid-token", setUser);

    expect(result).toBe(true);
    expect(setUser).toHaveBeenCalledWith("isAdmin");
  });

  it("returns false and does not call logUserFunction for expired token", () => {
    const setUser = jest.fn();
    const pastExp = Math.floor(Date.now() / 1000) - 3600;
    jwtDecode.default.mockReturnValue({
      user: { role: "isAdmin" },
      exp: pastExp,
    });

    const result = reconnector("expired-token", setUser);

    expect(result).toBe(false);
    expect(setUser).not.toHaveBeenCalled();
  });
});

describe("logout", () => {
  it("removes token from localStorage, calls setUser('') and setMessage", () => {
    localStorage.setItem(`token-${tokenName}`, "some-token");
    const setUser = jest.fn();
    const setMessage = jest.fn();

    logout(setUser, setMessage);

    expect(localStorage.getItem(`token-${tokenName}`)).toBeNull();
    expect(setUser).toHaveBeenCalledWith("");
    expect(setMessage).toHaveBeenCalledWith({
      success: true,
      message: "Déconnexion réussie",
    });
  });
});
