"use server"

import { cookies } from "next/headers"

interface SetCookieProps {
  name: string,
  value: string
}

export const setCookie = ({
  name,
  value
}: SetCookieProps) => {
  cookies().set(name, value)
}