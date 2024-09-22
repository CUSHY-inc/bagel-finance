import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import Providers from "@/components/layouts/providers/Providers";
import { fonts } from "@/styles/fonts";
import { Container } from "@chakra-ui/react";
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
    <html lang="en">
      <body className={fonts.poppins.className}>
        <Providers>
          <Header />
          <Container py="72px" mx="auto">
            {children}
          </Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
