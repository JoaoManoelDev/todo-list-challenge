import { cookies } from "next/headers"

import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const token = cookies().get("@todo:token-auth")

  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const url = new URL(path, baseUrl)

  return fetch(url, {
    ...init,
    headers: {
      "authorization": `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    }
  })
}
