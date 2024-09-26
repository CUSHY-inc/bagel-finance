import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function BackGround({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <Box bgGradient={`linear(to-b, ${color}, black, black)`} h="100%" pb={28}>
      {children}
    </Box>
  );
}
