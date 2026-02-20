import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import theme from "../theme";
import { AppProvider } from "../context/AppContext";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0 },
      mutations: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

const AllProviders = ({ children }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { renderWithProviders };
export default renderWithProviders;
