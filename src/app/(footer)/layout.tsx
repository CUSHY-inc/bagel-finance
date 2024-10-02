import Footer from "@/components/layouts/Footer";
import Providers from "@/components/layouts/providers/Providers";
import { fonts } from "@/styles/fonts";
import { Box } from "@chakra-ui/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
