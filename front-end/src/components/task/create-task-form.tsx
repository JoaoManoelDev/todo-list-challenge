"use client"

import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createTask } from "@/actions/create-task"

const createTaskForm = z.object({
  title: z.string().min(1, "O título não pode estar vazio."),
})

type CreateTaskForm = z.infer<typeof createTaskForm>

export const CreateTaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskForm),
  })

  const handleTask = async (data: CreateTaskForm) => {
    const response = await createTask(data.title)

    if (response?.success) {
      toast.success(response?.success)
      reset()
      return
    }

    if (response.error) {
      toast.error(response?.error)
    }
  }

  return (
    <form
      className="absolute max-w-2xl w-full bottom-[-1.2rem] px-4 flex gap-2"
      onSubmit={handleSubmit(handleTask)}
    >
      <div className="flex flex-col w-full">
        <Input
          {...register("title")}
          className="w-full"
        />

        {errors.title &&
          <p className="mt-11 max-w-2xl w-full text-sm text-red-500 fixed">
            {errors.title.message}
          </p>}
      </div>

      <Button disabled={isSubmitting} type="submit">Criar</Button>
    </form>
  )
}
