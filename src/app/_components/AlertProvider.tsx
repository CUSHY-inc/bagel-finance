"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Slide,
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

export const AlertLayout = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showAlert = (
    status: AlertState["status"],
    title: string,
    description?: string
  ) => {
    setAlert({ status, title, description });
    setIsVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      closeAlert();
    }, 3000);
  };

  const closeAlert = () => {
    setIsVisible(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setTimeout(() => {
      setAlert(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert && (
        <Slide in={isVisible} style={{ zIndex: 9999 }} direction="top">
          <Box maxWidth="640px" mx="auto" p={4}>
            <Alert status={alert.status} variant="solid" borderRadius="md">
              <AlertIcon />
              <Box flex={1}>
                <AlertTitle>{alert.title}</AlertTitle>
                {alert.description && (
                  <AlertDescription>{alert.description}</AlertDescription>
                )}
              </Box>
              <CloseButton
                onClick={closeAlert}
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          </Box>
        </Slide>
      )}
    </AlertContext.Provider>
  );
};
