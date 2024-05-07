"use client"

import { toast } from "sonner"
import { AxiosError } from "axios"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Task as TaskType, useTaskContext } from "@/contexts/task"
import { UpdateTaskForm } from "./update-task-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"


export const Task = ({ id, title, is_completed }: TaskType) => {
  const { toggleTaskCompleted, deleteTask, logOut } = useTaskContext()

  const handleToggleTaskCompleted = async () => {
    try {
      await toggleTaskCompleted(id)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) toast.error("Tarefa não encontrada.")
        if (error.response?.status === 401) logOut()
      } else {
        toast.error("Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.")
      }
    }
  }

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) toast.error("Tarefa não encontrada.")
        if (error.response?.status === 401) logOut()
      } else {
        toast.error("Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.")
      }
    }
  }

  return (
    <div
      className={cn(
        "flex border p-4 rounded-lg mt-5 gap-2", is_completed ?
        "line-through" : ""
      )}
    >
      <button
        className=""
        onClick={() => handleToggleTaskCompleted()}
      >
        {
          is_completed ?
          <Icons.checkCircle className="w-5 h-5" /> :
          <div className="border-2 rounded-full w-5 h-5 border-primary" />
        }
      </button>

      <p className="">
        {title}
      </p>

      <div className="ml-auto flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Icons.trash className="w-5 h-5 text-red-500" />
          </AlertDialogTrigger>

          <AlertDialogContent>

            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza disso</AlertDialogTitle>
              <AlertDialogDescription>
                Ao clicar em continuar você excluirá permanente esta tarefa.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteTask()}>Continuar</AlertDialogAction>
            </AlertDialogFooter>

          </AlertDialogContent>
        </AlertDialog>

        <Dialog>
          <DialogTrigger>
            <Icons.pencil className="w-5 h-5 text-yellow-500" />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Tarefa</DialogTitle>
            </DialogHeader>

            <UpdateTaskForm
              task={{
                id,
                title,
                is_completed
              }}
            /> 
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}