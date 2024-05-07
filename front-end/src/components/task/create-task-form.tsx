"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTaskContext } from "@/contexts/task"

const createTaskForm = z.object({
  title: z.string(),
})

type CreateTaskForm = z.infer<typeof createTaskForm>

export const CreateTaskForm = () => {
  const { createTask, logOut } = useTaskContext()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskForm),
  })

  const handleTask = async (data: CreateTaskForm) => {
    try {
      const response = await createTask(data)
      
      toast.success("Tarefa criada com sucesso.")
      
      reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          logOut()
        }
      } 

      toast.error("Erro ao atualizar tarefa. Por favor, tente novamente mais tarde.")
    }
  }

  return (
    <form
      className="absolute max-w-2xl w-full bottom-[-1.2rem] px-4 flex gap-2"
      onSubmit={handleSubmit(handleTask)}
    >
      <Input
        {...register("title")}
        className="w-full"
      />

      {errors.title &&
        <p className="text-sm text-red-500">
          {errors.title.message}
        </p>}

      <Button disabled={isSubmitting} type="submit">Criar</Button>
    </form>
  )
}
