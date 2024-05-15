"use server"

import { revalidatePath } from "next/cache"

import { api } from "@/data/api"
import { logOut } from "@/actions/log-out"

export interface UpdateTaskProps {
  task: {
    title: string 
    isCompleted: boolean
  },
  taskId: string
}

export const updateTask = async ({ task, taskId }: UpdateTaskProps) => {
  const response = await api(`/task/${taskId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: task.title,
      isCompleted: task.isCompleted
    })
  })

  if (response.status === 200) {
    revalidatePath("/")
    return { success: "Tarefa atualizada com sucesso." }
  }

  if (response.status === 401) {
    logOut()
  }

  return { error: "Algo deu errado, tente novamente mais tarde." }
}
  