"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { api } from "@/data/api"

export const deleteTask = async (taskId: string) => {
  const response = await api(`/task/${taskId}`, {
    method: "DELETE",
  })

  console.log("[ACTION DELETE TASK]", response)

  if (response.status === 204) {
    revalidatePath("/")
    return { success: "Tarefa deletada com sucesso" }
  }

  if (response.status === 409) {
    return { error: "Tarefa não encontrada." }
  }
  
  if (response.status === 401) {
    cookies().delete("@todo:token-auth")
    redirect("/sign-in")
  }

  return { error: "Algo deu errado, tente novamente mais tarde." }

}
