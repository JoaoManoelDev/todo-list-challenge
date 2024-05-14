"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { api } from "@/data/api"

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
    cookies().delete("@todo:token-auth")
    redirect("/sign-in")
  }

  return { error: "Algo deu errado, tente novamente mais tarde." }
}
  