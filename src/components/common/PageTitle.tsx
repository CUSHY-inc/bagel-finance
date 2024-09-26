import { dicebearStyle } from "@/lib/const";
import { Heading, Image, VStack } from "@chakra-ui/react";
import { createAvatar } from "@dicebear/core";

export default function PageTitle({ title }: { title: string }) {
  const avatar = createAvatar(dicebearStyle, {
    seed: title,
  });

  return (
    <VStack py={8}>
      <Image
        src={avatar.toDataUri()}
        alt={avatar.toString()}
        w={32}
        borderRadius="full"
      />
      <Heading>{title}</Heading>
    </VStack>
  );
}
