import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const fonts = {
  poppins,
};
