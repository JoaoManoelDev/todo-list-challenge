"use client"

import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { updateTask } from "@/actions/update-task"

const updateTaskForm = z.object({
  title: z.string().min(1, "O título não pode estar vazio."),
  isCompleted: z.boolean()
})

type UpdateTaskForm = z.infer<typeof updateTaskForm>

interface UpdateTaskFormProps {
  task: {
    id: string
    is_completed: boolean
    title: string
  }
}

export const UpdateTaskForm = ({ task }: UpdateTaskFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset
  } = useForm<UpdateTaskForm>({
    resolver: zodResolver(updateTaskForm),
    defaultValues: {
      isCompleted: task.is_completed ?? null,
      title: task.title ?? null
    }
  })

  const handleTaskForm = async (taskUpdate: UpdateTaskForm) => {
    const response = await updateTask({
      task: taskUpdate,
      taskId: task.id
    })

    if (response?.success) {
      toast.success(response?.success)
      return
    }

    if (response.error) {
      toast.error(response?.error)
    }
  }

  return (
    <form
      className="max-w-2xl w-full px-4 flex gap-2 flex-col space-y-3"
      onSubmit={handleSubmit(handleTaskForm)}
    >
      <div className="space-y-2">
        <Label htmlFor="title">Título da tarefa</Label>
        <Input
          id="title"
          {...register("title")}
          className="w-full"
        />
      </div>

      {errors.title &&
        <p className="text-sm text-red-500">
          {errors.title.message}
        </p>}

      <div className="flex items-center gap-2 mb-4">
        <Label htmlFor="is_completed">Está completa?</Label>

        <Controller
          name="isCompleted"
          control={control}
          defaultValue={task.is_completed}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
              value="isCompleted"
            >
              Está completa?
            </Checkbox>
          )}
        />
      </div>

      {errors.title &&
        <p className="text-sm text-red-500">
          {errors?.isCompleted?.message}
        </p>}

      <Button disabled={isSubmitting} type="submit">Salvar</Button>
    </form>
  )
}
