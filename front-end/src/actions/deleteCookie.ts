"use server"

import { cookies } from "next/headers"

interface DeleteCookieProps {
  name: string,
}

export const deleteCookie = ({
  name,
}: DeleteCookieProps) => {
  cookies().delete(name)
}
