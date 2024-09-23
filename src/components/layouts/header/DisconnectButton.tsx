"use client";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

export default function ConnectButton() {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  return (
    <Menu>
      <MenuButton
        as={Button}
        width="100%"
        flex={1}
        borderRadius="full"
        p={1}
        fontWeight="normal"
      >
        <VStack spacing={0}>
          <Text fontSize="xs">Wallet</Text>
          <Text fontSize="sm" as="b" isTruncated w="80px">
            {address}
          </Text>
        </VStack>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => tonConnectUI.disconnect()}>
          Disconnect
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
