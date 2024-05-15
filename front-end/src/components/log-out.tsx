"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { logOut } from "@/actions/log-out"

const handleLogOut = () => logOut()

export const LogOut = () => {
  return (
    <Button onClick={handleLogOut} className="gap-1">
      <span>sair</span>
      <Icons.logOut className="w-3 h-3" />
    </Button>
  )
}
