"use server"

import { revalidatePath } from "next/cache"

import { api } from "@/data/api"
import { logOut } from "@/actions/log-out"

export const toggleTaskCompleted = async (taskId: string) => {
  const response = await api(`/task/toggle-completed/${taskId}`, {
    method: "PATCH",
  })

  console.log("[ACTION TOGGLE TASK COMPLETED TASK]", response)

  if (response.status === 200) {
    revalidatePath("/")
    return
  }

  if (response.status === 409) {
    return { error: "Tarefa não encontrada." }
  }
  
  if (response.status === 401) {
    logOut()
  }

  return { error: "Algo deu errado, tente novamente mais tarde." }

}

