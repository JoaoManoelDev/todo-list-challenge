"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { http } from "@/lib/axios"

const registerForm = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type RegisterForm = z.infer<typeof registerForm>


export const Form = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<RegisterForm>()

  const handleRegister = async (data: RegisterForm) => {
    try {
      await http.post("/auth/register", data)

      toast.success("Cadastro finalizado com sucesso.", {
        action: {
          label: "Login",
          onClick: () => router.push("/sign-in")
        }
      })
  
    } catch (error) {
      console.log("catch error", error instanceof AxiosError)

      if (error instanceof AxiosError) {
        console.log("status error", error.request.status)
        if (error.request.status === 409) toast.error("E-mail já cadastrado.");
        if (error.request.status === 400) toast.error("Dados inválidos. Por favor, verifique os dados informados")
      } else {
         toast.error("Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.")
      }
    }
  }
  
  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          {...register("name")}
          id="name"
          type="text"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          disabled={isSubmitting}
        />
      </div>

      <Button
        className="w-full"
        type="submit"
      >
        Finalizar cadastro
      </Button>

      <p
        className="px-6 text-center text-sm leading-relaxed
        text-muted-foreground"
      >
        Ao continuar, você concorda com nossos {" "}
        <a className="underline underline-offset-4" href="#">
          termos de serviço
        </a> e {" "}
        <a className="underline underline-offset-4" href="#">
          políticas de privacidade
        </a>
      </p>
    </form>
  )
}
