"use client";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Box, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { LuCoins, LuHome, LuUserCircle, LuUsers } from "react-icons/lu";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const { mainColor } = useThemeColor();

  const navItems = [
    {
      label: "Home",
      icon: <LuHome size={24} />,
      href: "/",
    },
    {
      label: "Earn",
      icon: <LuCoins size={24} />,
      href: "/earn",
    },
    {
      label: "Frens",
      icon: <LuUsers size={24} />,
      href: "/frens",
    },
    {
      label: "Profile",
      icon: <LuUserCircle size={24} />,
      href: "/profile",
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
            color={
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/vote")
                  ? mainColor
                  : ""
                : pathname.startsWith(item.href)
                ? mainColor
                : ""
            }
            borderRadius={8}
          >
            {item.icon}
            <Text fontSize="xs">{item.label}</Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
}
