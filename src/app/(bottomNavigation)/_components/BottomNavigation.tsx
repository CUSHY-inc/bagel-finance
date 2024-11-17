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

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { mainColor } = useThemeColor();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<boolean>(
    userId ? `/api/users/${userId}/tasks/new` : null,
    fetcher
  );
  const hasTaskUpdate = !isLoading && data;

  if (error) {
    throw error;
  }

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
      hasUpdate: false,
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
    <Box
      position="absolute"
      left={0}
      right={0}
      bottom={0}
      zIndex={1}
      p={4}
      pb={8}
    >
      <HStack
        justify="space-around"
        align="center"
        bgColor="gray.800"
        p={2}
        borderRadius={8}
        border="1px"
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
    </Box>
  );
}
