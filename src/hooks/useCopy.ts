"use client";

import { useAlert } from "@/app/_components/AlertProvider";
import { useClipboard } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export function useCopy(text: string) {
  const { onCopy, hasCopied } = useClipboard(text);
  const { showAlert } = useAlert();
  const hasShownAlertRef = useRef(false);

  useEffect(() => {
    if (hasCopied && !hasShownAlertRef.current) {
      showAlert("success", "Copied!");
      hasShownAlertRef.current = true;
      setTimeout(() => {
        hasShownAlertRef.current = false;
      }, 1000);
    }
  }, [hasCopied, showAlert]);

  return { onCopy };
}
