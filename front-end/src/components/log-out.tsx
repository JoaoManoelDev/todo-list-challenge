"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useTaskContext } from "@/contexts/task"

export const LogOut = () => {
  const { logOut } = useTaskContext()

  return (
    <Button className="gap-1" onClick={() => logOut()}>
      <span>sair</span>
      <Icons.logOut className="w-3 h-3" />
    </Button>
  )
}
