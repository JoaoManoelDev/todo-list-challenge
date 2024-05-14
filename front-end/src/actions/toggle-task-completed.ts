"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { api } from "@/data/api"

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
    cookies().delete("@todo:token-auth")
    redirect("/sign-in")
  }

  return { error: "Algo deu errado, tente novamente mais tarde." }

}

