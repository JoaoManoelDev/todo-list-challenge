import { Inter, Montserrat } from "next/font/google"

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export const montserrat = Montserrat({
  weight: ["600", "400"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})