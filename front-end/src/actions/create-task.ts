"use server"

import { revalidatePath } from "next/cache"

import { api } from "@/data/api"
import { logOut } from "@/actions/log-out"

export const createTask = async (title: string) => {
  const response = await api("/task", {
    method: "POST",
    body: JSON.stringify({ title })
  })

  if (response.status === 201 ) {
    revalidatePath("/")
    return { success: "Tarefa criada com sucesso." }
  }

  if (response.status === 401) {
    logOut
  }

  return { error: "Algo deu errado, tente novamente mais tarde." }
}
  