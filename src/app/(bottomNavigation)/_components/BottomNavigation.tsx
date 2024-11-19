"use client";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { LuCoins, LuUserCircle, LuUsers } from "react-icons/lu";
import { MdCurrencyExchange } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import useSWR from "swr";
import { useInitData } from "@telegram-apps/sdk-react";
import { fetcher } from "@/lib/swr";
import { HomeInfo, TaskWithUserTasks } from "@/types/prisma";

function useHasTaskUpdate(userId?: number) {
  const { data, error, isLoading } = useSWR<TaskWithUserTasks[]>(
    userId ? `/api/users/${userId}/tasks` : null,
    fetcher
  );
  if (isLoading || !data) {
    return false;
  }
  if (error) {
    throw error;
  }
  for (const task of data) {
    if (task.userTasks[0].status !== "CLAIMED") {
      return true;
    }
  }
  return false;
}

function useHasGameUpdate(userId?: number) {
  const { data, error, isLoading } = useSWR<HomeInfo>(
    userId ? `/api/users/${userId}/votes/now` : null,
    fetcher,
    { revalidateOnMount: true }
  );
  if (isLoading || !data) {
    return false;
  }
  if (error) {
    throw error;
  }
  return data.nextRound && !data.nextRound.votes[0];
}

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { mainColor } = useThemeColor();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const hasTaskUpdate = useHasTaskUpdate(userId);
  const hasGameUpdate = useHasGameUpdate(userId);

  const navItems = [
    {
      label: "Exchange",
      icon: <MdCurrencyExchange size={24} />,
      href: "/exchange",
      hasUpdate: false,
    },
    {
      label: "Tasks",
      icon: <LuCoins size={24} />,
      href: "/tasks",
      hasUpdate: hasTaskUpdate,
    },
    {
      label: "Game",
      icon: <IoGameControllerOutline size={24} />,
      href: "/",
      hasUpdate: hasGameUpdate,
    },
    {
      label: "Frens",
      icon: <LuUsers size={24} />,
      href: "/frens",
      hasUpdate: false,
    },
    {
      label: "Profile",
      icon: <LuUserCircle size={24} />,
      href: "/profile",
      hasUpdate: false,
    },
  ];

  return (
    <HStack
      position="absolute"
      w={"100%"}
      bottom={0}
      zIndex={1}
      justifyContent="space-around"
      alignItems="center"
      bg={"black"}
      p={2}
      pb={6}
      borderTop={"1px"}
      borderColor="gray.600"
      boxShadow="md"
      divider={<StackDivider />}
    >
      {navItems.map((item) => (
        <VStack
          spacing={0}
          key={item.label}
          cursor="pointer"
          onClick={() => router.push(item.href)}
          flex={1}
          position={"relative"}
          color={
            item.href === "/"
              ? pathname === "/"
                ? mainColor
                : undefined
              : pathname.startsWith(item.href)
              ? mainColor
              : undefined
          }
          borderRadius={8}
        >
          {item.hasUpdate && (
            <Box
              w={1}
              h={1}
              top={0}
              right={0}
              bg={"red.500"}
              borderRadius={"full"}
              position={"absolute"}
            />
          )}
          {item.icon}
          <Text fontSize="xs">{item.label}</Text>
        </VStack>
      ))}
    </HStack>
  );
}
