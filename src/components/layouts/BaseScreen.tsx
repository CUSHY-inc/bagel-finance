import { Box } from "@chakra-ui/react";
import BackButton from "../telegram/BackButton";
import NoBackButton from "../telegram/NoBackButton";

export default function BaseScreen({
  children,
  color,
  hasBackButton,
}: {
  children: React.ReactNode;
  color: string;
  hasBackButton?: boolean;
}) {
  return (
    <Box
      bgGradient={`linear(to-b, ${color}, black, black)`}
      h="100%"
      pb={28}
      overflowY="auto"
    >
      {hasBackButton ? <BackButton /> : <NoBackButton />}
      {children}
    </Box>
  );
}
