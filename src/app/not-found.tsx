import { Image, Text, VStack } from "@chakra-ui/react";

export default function Error() {
  return (
    <VStack h="100%" justifyContent="center" bg="black">
      <Image
        boxSize={64}
        src="https://bagel-finance.s3.ap-northeast-1.amazonaws.com/images/icons/tonny-error.png"
        alt=""
      />
      <Text fontSize="xl" as="b" textAlign="center">
        404 Not Found
      </Text>
    </VStack>
  );
}
