"use client";

import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { FaDollarSign, FaUser } from "react-icons/fa";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Indexes", icon: <FaDollarSign />, href: "/indexes" },
    { label: "Profile", icon: <FaUser />, href: "/profile" },
  ];

  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      zIndex={1}
      p={4}
      mb="env(safe-area-inset-bottom)"
      boxShadow="md"
    >
      <Flex
        justify="space-around"
        align="center"
        bgColor="gray.600"
        p={2}
        borderRadius="full"
      >
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            fontWeight="normal"
            onClick={() => router.push(item.href)}
            color={pathname.startsWith(item.href) ? "blue.200" : undefined}
          >
            <VStack spacing={1}>
              {item.icon}
              <Text fontSize="xs">{item.label}</Text>
            </VStack>
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
