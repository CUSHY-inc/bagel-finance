import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  UseDisclosureReturn,
  AlertDialog,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function BaseAlertDialog({
  disclosure,
  title,
  body,
  yesButtonText,
  yesButtonColor,
  noButtonText,
  onClick,
}: {
  disclosure: UseDisclosureReturn;
  title: string;
  body: string;
  yesButtonText?: string;
  yesButtonColor?: string;
  noButtonText?: string;
  onClick?: () => void;
}) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={disclosure.onClose}
      isOpen={disclosure.isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          {noButtonText && (
            <Button ref={cancelRef} onClick={disclosure.onClose}>
              {noButtonText}
            </Button>
          )}
          {yesButtonText && (
            <Button
              colorScheme={yesButtonColor ?? "blue"}
              ml={3}
              onClick={onClick}
            >
              {yesButtonText}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
