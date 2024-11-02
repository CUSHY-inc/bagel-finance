import { useAlert } from "@/app/_components/AlertProvider";
import { useClipboard } from "@chakra-ui/react";
import { useEffect } from "react";

export function useCopy(text: string) {
  const { onCopy, hasCopied } = useClipboard(text);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (hasCopied) {
      showAlert("success", "Copied!");
    }
  }, [hasCopied]);

  return { onCopy };
}
