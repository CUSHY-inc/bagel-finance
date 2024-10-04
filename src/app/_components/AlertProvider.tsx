"use client";

import { createContext, useContext, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

type AlertState = {
  status: "info" | "warning" | "success" | "error";
  title: string;
  description?: string;
};

type AlertContextType = {
  showAlert: (
    status: AlertState["status"],
    title: string,
    description?: string
  ) => void;
  closeAlert: () => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = (
    status: AlertState["status"],
    title: string,
    description?: string
  ) => {
    setAlert({ status, title, description });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert && (
        <Box position="fixed" top={0} left={0} right={0} zIndex={2} p={4}>
          <Alert status={alert.status} variant="left-accent">
            <AlertIcon />
            <Box flex={1}>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Box>
            <CloseButton onClick={closeAlert} />
          </Alert>
        </Box>
      )}
    </AlertContext.Provider>
  );
};
