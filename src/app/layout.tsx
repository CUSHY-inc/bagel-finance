import Footer from "@/components/layouts/footer/Footer";
import Providers from "@/components/layouts/providers/Providers";
import { fonts } from "@/styles/fonts";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "bagel finance",
  description: "bagel finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className={fonts.poppins.className} style={{ height: "100%" }}>
        <Providers>
          <Box maxW={640} mx="auto" h="100%" position="relative">
            {children}
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
