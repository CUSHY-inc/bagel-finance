import Footer from "@/components/layouts/Footer";
import CheckLogin from "./_components/CheckLogin";
import CheckResult from "./_components/CheckResult";
import { Box } from "@chakra-ui/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CheckLogin>
      <CheckResult>
        <Box h={"100%"}>
          {children}
          <Footer />
        </Box>
      </CheckResult>
    </CheckLogin>
  );
}
