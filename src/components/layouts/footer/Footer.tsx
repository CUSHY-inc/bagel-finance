"use client";

import { Button, Flex } from "@chakra-ui/react";
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";

export default function Footer() {
  const isConnectionRestored = useIsConnectionRestored();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  return (
    <>
      {!address && isConnectionRestored && (
        <Flex
          as="footer"
          position="fixed"
          bottom="0"
          width="100%"
          justifyContent="center"
          alignItems="center"
          zIndex={1}
        >
          <Button
            w="100%"
            colorScheme="blue"
            size="lg"
            onClick={() => tonConnectUI.openModal()}
          >
            Connect
          </Button>
        </Flex>
      )}
    </>
  );
}
