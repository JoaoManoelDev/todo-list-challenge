"use server"

import { revalidatePath } from "next/cache"

import { api } from "@/data/api"
import { logOut } from "@/actions/log-out"

export const deleteTask = async (taskId: string) => {
  const response = await api(`/task/${taskId}`, {
    method: "DELETE",
  })

  if (response.status === 204) {
    revalidatePath("/")
    return { success: "Tarefa deletada com sucesso" }
  }

  if (response.status === 409) {
    return { error: "Tarefa não encontrada." }
  }
  
  if (response.status === 401) {
    logOut()
  }

  return { error: "Algo deu errado, tente novamente mais tarde." }

}
