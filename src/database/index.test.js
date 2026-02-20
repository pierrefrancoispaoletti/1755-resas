import axios from "axios";
import CallAxios from "./index";

jest.mock("axios");

describe("CallAxios", () => {
  const mockResponse = { data: { status: 200 } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ─── auth ────────────────────────────────────────────────────────────────────

  describe("auth", () => {
    it("returns false when credentials is null", async () => {
      expect(await CallAxios.auth(null)).toBe(false);
      expect(axios).not.toHaveBeenCalled();
    });

    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const result = await CallAxios.auth({ email: "a@b.com", password: "pass" });
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "post",
          url: expect.stringContaining("/auth/login"),
        })
      );
    });

    it("returns false on network error", async () => {
      axios.mockRejectedValue(new Error("Network Error"));
      expect(await CallAxios.auth({ email: "a@b.com", password: "pass" })).toBe(false);
    });
  });

  // ─── postAdminRegistrationToken ──────────────────────────────────────────────

  describe("postAdminRegistrationToken", () => {
    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const result = await CallAxios.postAdminRegistrationToken("tok", "regKey");
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "post",
          url: expect.stringContaining("/registrationToken"),
        })
      );
    });

    it("returns false on error", async () => {
      axios.mockRejectedValue(new Error("fail"));
      expect(await CallAxios.postAdminRegistrationToken("tok", "regKey")).toBe(false);
    });
  });

  // ─── getAllBookings ───────────────────────────────────────────────────────────

  describe("getAllBookings", () => {
    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const result = await CallAxios.getAllBookings("tok");
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "get",
          url: expect.stringContaining("/allBookings"),
        })
      );
    });

    it("returns false on error", async () => {
      axios.mockRejectedValue(new Error("fail"));
      expect(await CallAxios.getAllBookings("tok")).toBe(false);
    });
  });

  // ─── postBooking ─────────────────────────────────────────────────────────────

  describe("postBooking", () => {
    it("returns false when booking is null", async () => {
      expect(await CallAxios.postBooking(null)).toBe(false);
      expect(axios).not.toHaveBeenCalled();
    });

    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const booking = { bookerName: "Alice", bookingDate: "2026-03-01" };
      const result = await CallAxios.postBooking(booking, "pushTok");
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "post",
          url: expect.stringContaining("/createBooking"),
        })
      );
    });

    it("returns false on error", async () => {
      axios.mockRejectedValue(new Error("fail"));
      expect(await CallAxios.postBooking({ bookerName: "Alice" })).toBe(false);
    });
  });

  // ─── updateBooking ───────────────────────────────────────────────────────────

  describe("updateBooking", () => {
    it("returns false when update is null", async () => {
      expect(await CallAxios.updateBooking(null, "tok")).toBe(false);
      expect(axios).not.toHaveBeenCalled();
    });

    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const result = await CallAxios.updateBooking({ _id: "b1" }, "tok");
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "post",
          url: expect.stringContaining("/updateBooking"),
        })
      );
    });

    it("returns false on error", async () => {
      axios.mockRejectedValue(new Error("fail"));
      expect(await CallAxios.updateBooking({ _id: "b1" }, "tok")).toBe(false);
    });
  });

  // ─── deleteBooking ───────────────────────────────────────────────────────────

  describe("deleteBooking", () => {
    it("returns false when update is null", async () => {
      expect(await CallAxios.deleteBooking(null, "tok")).toBe(false);
      expect(axios).not.toHaveBeenCalled();
    });

    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const result = await CallAxios.deleteBooking({ _id: "b1" }, "tok");
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "delete",
          url: expect.stringContaining("/deleteBooking"),
        })
      );
    });

    it("returns false on error", async () => {
      axios.mockRejectedValue(new Error("fail"));
      expect(await CallAxios.deleteBooking({ _id: "b1" }, "tok")).toBe(false);
    });
  });

  // ─── getConfig ───────────────────────────────────────────────────────────────

  describe("getConfig", () => {
    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const result = await CallAxios.getConfig();
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "get",
          url: expect.stringContaining("/getConfig"),
        })
      );
    });

    it("returns false on error", async () => {
      axios.mockRejectedValue(new Error("fail"));
      expect(await CallAxios.getConfig()).toBe(false);
    });
  });

  // ─── updateConfig ────────────────────────────────────────────────────────────

  describe("updateConfig", () => {
    it("returns false when update is null", async () => {
      expect(await CallAxios.updateConfig(null, "tok")).toBe(false);
      expect(axios).not.toHaveBeenCalled();
    });

    it("returns response on success", async () => {
      axios.mockResolvedValue(mockResponse);
      const result = await CallAxios.updateConfig({ resaOpen: true }, "tok");
      expect(result).toBe(mockResponse);
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "post",
          url: expect.stringContaining("/updateConfig"),
        })
      );
    });

    it("returns false on error", async () => {
      axios.mockRejectedValue(new Error("fail"));
      expect(await CallAxios.updateConfig({ resaOpen: true }, "tok")).toBe(false);
    });
  });
});
