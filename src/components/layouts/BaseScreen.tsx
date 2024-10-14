import { Box } from "@chakra-ui/react";
import BackButton from "../telegram/BackButton";
import NoBackButton from "../telegram/NoBackButton";

export default function BaseScreen({
  children,
  color,
  hasBottomPadding,
  hasBackButton,
}: {
  children: React.ReactNode;
  color?: string;
  hasBottomPadding?: boolean;
  hasBackButton?: boolean;
}) {
  return (
    <Box bg={color} h="100%" overflowY="auto" pb={hasBottomPadding ? 24 : 0}>
      {hasBackButton ? <BackButton /> : <NoBackButton />}
      {children}
    </Box>
  );
}
