import {
  Geist_Mono,
  Quicksand,
  Shadows_Into_Light_Two,
} from "next/font/google";

// sans fonts from google to choose from (variable)
// Quicksand  Manrope Fustat  Outfit  Karla Jost  Comfortaa Lexend Urbanist

export const fontSans = Quicksand({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const fontDisplay = Shadows_Into_Light_Two({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

export const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
