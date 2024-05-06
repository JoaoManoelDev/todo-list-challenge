import type { Metadata } from "next"

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { fontInter, montserrat } from "@/styles/fonts"

export const metadata: Metadata = {
  title: "Todo App",
  description: "Sistema de lista de tarefas",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen font-inter antialiased",
          fontInter.variable,
          montserrat.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout