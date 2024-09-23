import { HStack, Image } from "@chakra-ui/react";
import WalletConnect from "./WalletConnect";
import BalanceButton from "./BalanceButton";

export default function Header() {
  return (
    <HStack
      as="header"
      position="fixed"
      top="0"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      p={3}
      spacing={4}
      zIndex={1}
    >
      <BalanceButton />
      <Image
        borderRadius="full"
        boxSize="48px"
        src="/images/bagel-finance-icon.png"
        alt="bagel-finance-icon"
      />
      <WalletConnect />
    </HStack>
  );
}
