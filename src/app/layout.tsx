import Providers from "@/app/_components/Providers";
import { fonts } from "@/styles/fonts";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { AlertLayout } from "./_components/AlertProvider";
import CheckUser from "./_components/CheckUser";

export const metadata: Metadata = {
  title: "Bagel Finance",
  description: "Bagel Finance",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className={fonts.poppins.className} style={{ height: "100%" }}>
        <Providers>
          <Box maxW={640} mx="auto" h="100%" position="relative" bg={"black"}>
            <AlertLayout>
              <CheckUser>{children}</CheckUser>
            </AlertLayout>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
