"use client";

import { shortenStr } from "@/lib/common";
import {
  HStack,
  VStack,
  Button,
  Text,
  Skeleton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useRef } from "react";
import { LuWallet } from "react-icons/lu";

function DisconnectButton() {
  const [tonConnectUI] = useTonConnectUI();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button size="sm" borderRadius="full" onClick={onOpen}>
        Disconnect
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Disconnect the wallet?</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to discard all of your notes? 44 words will be
            deleted.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => tonConnectUI.disconnect()}
            >
              Disconnect
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function WalletConnect() {
  const isConnectionRestored = useIsConnectionRestored();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  return (
    
    <HStack p={2} spacing={4}>
      <LuWallet size={24} />
      <VStack flex={1} alignItems="start" spacing={0}>
        {isConnectionRestored ? (
          <>
            <Text>{address ? "Connected wallet" : "Wallet connect"}</Text>
            <Text fontSize="sm" color="gray">
              {shortenStr(address, 6, 4)}
            </Text>
          </>
        ) : (
          <Skeleton>Wallet connect</Skeleton>
        )}
      </VStack>
      {isConnectionRestored ? (
        <>
          {address ? (
            <DisconnectButton />
          ) : (
            <Button
              size="sm"
              borderRadius="full"
              onClick={() => tonConnectUI.openModal()}
            >
              Connect
            </Button>
          )}
        </>
      ) : (
        <Button size="sm" borderRadius="full">
          <Skeleton>Connect</Skeleton>
        </Button>
      )}
    </HStack>
  );
}
