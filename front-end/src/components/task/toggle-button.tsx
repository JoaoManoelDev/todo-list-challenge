"use client"

import { toast } from "sonner"

import { toggleTaskCompleted } from "@/actions/toggle-task-completed"
import { Icons } from "@/components/icons"

interface ToggleButtonProps {
  task: {
    id: string
    title: string
    is_completed: boolean
  }
}

export const ToggleButton = ({ task }: ToggleButtonProps) => {
  const handleToggleTaskCompleted = async () => {
    const response = await toggleTaskCompleted(task.id)
    if (response?.error) return toast.error(response?.error)
  }

  return (
    <button onClick={handleToggleTaskCompleted}>
      {
        task.is_completed ?
          <Icons.checkCircle className="w-5 h-5" /> :
          <div className="border-2 rounded-full w-5 h-5 border-primary" />
      }
    </button>
  )
}