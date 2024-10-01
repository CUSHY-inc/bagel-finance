"use client";

import {
  Box,
  HStack,
  Image,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { createAvatar } from "@dicebear/core";
import { dicebearStyle } from "@/lib/const";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const avatarType = dicebearStyle;
  const navItems = [
    {
      label: "Home",
      avatar: createAvatar(avatarType, {
        seed: "Home",
      }),
      href: "/",
    },
    {
      label: "Earn",
      avatar: createAvatar(avatarType, {
        seed: "Earn",
      }),
      href: "/earn",
    },
    {
      label: "Friends",
      avatar: createAvatar(avatarType, {
        seed: "Friends",
      }),
      href: "/friends",
    },
    {
      label: "Profile",
      avatar: createAvatar(avatarType, {
        seed: "Profile",
      }),
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
        borderRadius={16}
        boxShadow="md"
        divider={<StackDivider />}
        alignItems="center"
        justifyContent="stretch"
        h={16}
      >
        {navItems.map((item) => (
          <VStack
            spacing={0}
            key={item.label}
            cursor="pointer"
            onClick={() => router.push(item.href)}
            flex={1}
            bgColor={
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/vote")
                  ? "gray.700"
                  : ""
                : pathname.startsWith(item.href)
                ? "gray.700"
                : ""
            }
            borderRadius={8}
          >
            <Image
              src={item.avatar.toDataUri()}
              alt={item.avatar.toString()}
              w={8}
              borderRadius="full"
            />
            <Text fontSize="xs">{item.label}</Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
}
