import {
  Archivo_Black,
  Geist_Mono,
  Honk,
  Space_Grotesk,
} from "next/font/google"

// sans fonts from google to choose from (variable)
// Quicksand  Manrope Fustat  Outfit  Karla Jost  Comfortaa Lexend Urbanist

export const fontSans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
})

// export const fontDisplay = Shadows_Into_Light_Two({
//   weight: "400",
//   variable: "--font-display",
//   subsets: ["latin"],
// })

export const fontHead = Honk({
  weight: "400",
  variable: "--font-head",
  subsets: ["latin"],
})

export const fontDisplay = Archivo_Black({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
})

export const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})
