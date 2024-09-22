import { Button, Flex } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      position="fixed"
      bottom="0"
      width="100%"
      justifyContent="center"
      alignItems="center"
      zIndex={1}
    >
      <Button w="100%" colorScheme="blue" size="lg">
        Connect
      </Button>
    </Flex>
  );
}
