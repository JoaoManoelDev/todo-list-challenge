"use client"

import { toast } from "sonner"

import { deleteTask } from "@/actions/delete-task"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"

interface DeleteModalProps {
  task: {
    id: string
    title: string
    is_completed: boolean
  }
}

export const DeleteModal = ({ task }: DeleteModalProps) => {
  const handleDeleteTask = async () => {
    const response = await deleteTask(task.id)
    if (response?.error) return toast.error(response?.error)
    if (response?.success) return toast.success(response?.success)
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza disso</AlertDialogTitle>
        <AlertDialogDescription>
          Ao clicar em continuar você excluirá permanente esta tarefa.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteTask}>Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}