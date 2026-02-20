import React, { createContext, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CallAxios from "../database";
import { useApp } from "./AppContext";

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const { setMessage } = useApp();
  const queryClient = useQueryClient();

  const {
    data: config = {},
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["config"],
    queryFn: async () => {
      const response = await CallAxios.getConfig();
      if (response && response.data.status === 200) {
        return response.data.config;
      }
      throw new Error("Failed to fetch config");
    },
  });

  useEffect(() => {
    if (isError) {
      setMessage({
        success: false,
        message:
          "Impossible de récupérer la configuration, contacter l'administrateur",
      });
    }
  }, [isError, setMessage]);

  const setConfig = (newConfig) => {
    queryClient.setQueryData(["config"], newConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, loading, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error("useConfig must be used within ConfigProvider");
  return context;
};

export default ConfigContext;
