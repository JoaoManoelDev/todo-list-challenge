"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logOut = () => {
  cookies().delete("@todo:token-auth")
  return redirect("/sign-in")
}