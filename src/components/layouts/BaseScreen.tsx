import { Box } from "@chakra-ui/react";
import BackButton from "../telegram/BackButton";
import NoBackButton from "../telegram/NoBackButton";

export default function BaseScreen({
  children,
  color,
  hasBackButton,
  footerPadding,
}: {
  children: React.ReactNode;
  color?: string;
  hasBackButton?: boolean;
  footerPadding?: boolean;
}) {
  return (
    <Box
      bg={color ? color : "black"}
      h="100%"
      pb={footerPadding ? 28 : 0}
      overflowY="auto"
    >
      {hasBackButton ? <BackButton /> : <NoBackButton />}
      {children}
    </Box>
  );
}
