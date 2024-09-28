import { Box } from "@chakra-ui/react";

export default function BackGround({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <Box
      bgGradient={`linear(to-b, ${color}, black, black)`}
      h="100%"
      pb={28}
      overflowY="auto"
    >
      {children}
    </Box>
  );
}
