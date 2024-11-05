"use client";

import { useCopy } from "@/hooks/useCopy";
import { fetcher } from "@/lib/swr";
import { Button, HStack, IconButton, Skeleton, VStack } from "@chakra-ui/react";
import { Invite } from "@prisma/client";
import { useInitData, useUtils } from "@telegram-apps/sdk-react";
import { LuCopy } from "react-icons/lu";
import useSWR from "swr";

export default function InviteButton() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const utils = useUtils();
  const { data, error, isLoading } = useSWR<Invite>(
    userId ? `/api/users/${userId}/invite` : null,
    fetcher
  );
  const inviteUrl = `https://t.me/${process.env.BOT_NAME}/app?startapp=${data?.inviteCode}`;
  const { onCopy } = useCopy(inviteUrl);

  if (error) {
    throw error;
  }

  return (
    <VStack align={"stretch"}>
      <HStack>
        <Button
          colorScheme="blue"
          flex={1}
          onClick={() => utils.shareURL(inviteUrl)}
        >
          {isLoading ? <Skeleton>Invite</Skeleton> : "Invite"}
        </Button>
        <IconButton
          aria-label={"copy-invite-link"}
          variant={"outline"}
          colorScheme="blue"
          icon={<LuCopy />}
          isDisabled={isLoading}
          onClick={onCopy}
        />
      </HStack>
    </VStack>
  );
}
