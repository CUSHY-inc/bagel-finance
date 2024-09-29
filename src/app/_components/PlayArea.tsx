"use client";

import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function PlayArea() {
  const router = useRouter();

  return (
    <Box p={4}>
      <Button
        w="100%"
        size="lg"
        colorScheme="blue"
        onClick={() => router.push("/vote")}
      >
        Play
      </Button>
    </Box>
  );
}
