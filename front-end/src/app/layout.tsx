import type { Metadata } from "next"
import { Toaster } from "sonner"

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { fontInter, montserrat } from "@/styles/fonts"
import { ThemeProvider } from "@/theme/provider"

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
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen font-inter antialiased",
        fontInter.variable,
        montserrat.variable
      )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout