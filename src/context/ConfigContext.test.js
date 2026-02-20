import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, useConfig } from "./ConfigContext";
import { useApp } from "./AppContext";
import CallAxios from "../database";

jest.mock("../database", () => ({
  __esModule: true,
  default: { getConfig: jest.fn() },
}));

jest.mock("./AppContext", () => ({
  useApp: jest.fn(),
}));

// ─── helpers ─────────────────────────────────────────────────────────────────

const createTestClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
    logger: { log: () => {}, warn: () => {}, error: () => {} },
  });

const renderWithQuery = (ui, queryClient) => {
  const qc = queryClient || createTestClient();
  return render(
    <QueryClientProvider client={qc}>
      <ConfigProvider>{ui}</ConfigProvider>
    </QueryClientProvider>
  );
};

// Consumer that exposes config values for assertions
const TestConsumer = () => {
  const { config, loading, setConfig } = useConfig();
  return (
    <div>
      <span data-testid="config">{JSON.stringify(config)}</span>
      <span data-testid="loading">{String(loading)}</span>
      <button
        onClick={() => setConfig({ resaOpen: true, _id: "updated" })}
      >
        Set Config
      </button>
    </div>
  );
};

// ─── tests ───────────────────────────────────────────────────────────────────

describe("ConfigContext", () => {
  let mockSetMessage;

  beforeEach(() => {
    mockSetMessage = jest.fn();
    useApp.mockReturnValue({ setMessage: mockSetMessage });
    jest.clearAllMocks();
    useApp.mockReturnValue({ setMessage: mockSetMessage });
  });

  it("renders children without crashing", async () => {
    CallAxios.getConfig.mockResolvedValue({
      data: { status: 200, config: {} },
    });
    renderWithQuery(<div data-testid="child">hello</div>);
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("populates config after successful getConfig()", async () => {
    const mockConfig = { resaOpen: true, _id: "cfg-1" };
    CallAxios.getConfig.mockResolvedValue({
      data: { status: 200, config: mockConfig },
    });
    renderWithQuery(<TestConsumer />);
    await waitFor(() => {
      expect(screen.getByTestId("config")).toHaveTextContent('"resaOpen":true');
    });
  });

  it("setConfig() updates the React Query cache", async () => {
    const mockConfig = { resaOpen: false, _id: "cfg-1" };
    CallAxios.getConfig.mockResolvedValue({
      data: { status: 200, config: mockConfig },
    });
    const user = userEvent.setup();
    renderWithQuery(<TestConsumer />);

    // Wait for initial config
    await waitFor(() => {
      expect(screen.getByTestId("config")).toHaveTextContent('"resaOpen":false');
    });

    // Trigger setConfig
    await user.click(screen.getByText("Set Config"));

    expect(screen.getByTestId("config")).toHaveTextContent('"resaOpen":true');
    expect(screen.getByTestId("config")).toHaveTextContent('"_id":"updated"');
  });

  it("config defaults to {} before fetch resolves", () => {
    // Never resolves → stays pending
    CallAxios.getConfig.mockReturnValue(new Promise(() => {}));
    renderWithQuery(<TestConsumer />);
    expect(screen.getByTestId("config")).toHaveTextContent("{}");
  });

  it("loading is true while fetch is pending", () => {
    CallAxios.getConfig.mockReturnValue(new Promise(() => {}));
    renderWithQuery(<TestConsumer />);
    expect(screen.getByTestId("loading")).toHaveTextContent("true");
  });

  it("loading becomes false after fetch resolves", async () => {
    CallAxios.getConfig.mockResolvedValue({
      data: { status: 200, config: { resaOpen: true } },
    });
    renderWithQuery(<TestConsumer />);
    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
  });

  it("calls setMessage with error when getConfig fails", async () => {
    CallAxios.getConfig.mockResolvedValue(false);
    renderWithQuery(<TestConsumer />);
    await waitFor(() => {
      expect(mockSetMessage).toHaveBeenCalledWith(
        expect.objectContaining({ success: false })
      );
    });
  });

  it("throws if useConfig is used outside ConfigProvider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const BadConsumer = () => {
      useConfig();
      return null;
    };
    expect(() => render(<BadConsumer />)).toThrow(
      "useConfig must be used within ConfigProvider"
    );
    consoleError.mockRestore();
  });
});
