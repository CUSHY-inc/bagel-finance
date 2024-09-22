import Providers from "@/components/layouts/providers/Providers";
import { fonts } from "@/styles/fonts";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
