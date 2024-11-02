"use client";

import { ButtonProps, useDisclosure, Button } from "@chakra-ui/react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import BaseAlertDialog from "../alert/BaseAlertDialog";

export default function DisconnectButton({
  children,
  ...props
}: { children: React.ReactNode } & ButtonProps) {
  const [tonConnectUI] = useTonConnectUI();
  const disclosure = useDisclosure();

  return (
    <>
      <Button onClick={disclosure.onOpen} {...props}>
        {children}
      </Button>
      <BaseAlertDialog
        disclosure={disclosure}
        title={"Disconnect your wallet?"}
        body={"Are you sure you want to disconnect your wallet?"}
        yesButtonText="Disconnect"
        yesButtonColorScheme="red"
        noButtonText="Cancel"
        onClick={() => tonConnectUI.disconnect()}
      />
    </>
  );
}
