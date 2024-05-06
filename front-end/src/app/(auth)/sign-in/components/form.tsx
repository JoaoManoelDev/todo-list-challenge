"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ZodError, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { AxiosError } from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { http } from "@/lib/axios"
import { setCookie } from "@/actions/setCookie"

const signInForm = z.object({
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres.")
})

type SingInForm = z.infer<typeof signInForm>

export const Form = () => {
  const searchParams = useSearchParams()
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SingInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searchParams.get("email") ?? ""
    }
  })

  const handleSignIn = async (data: SingInForm) => {
    try {
      const response = await http.post("/auth/sign-in", data)

      setCookie({
        name: "@todo:token-auth",
        value: response.data.token
      })

      toast.success("Bem vindo ao Todo App!.", )
  
    } catch (error) {
      if (error instanceof ZodError) {

        toast.error(error.message)
      } 
      
      if (error instanceof AxiosError) {
        if (error.request.status === 409) toast.error("Credenciais inválidas.");
        if (error.request.status === 400) toast.error("Dados inválidos. Por favor, verifique os dados informados")
      } else {
         toast.error("Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.")
      }
    }
  }
  
  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          disabled={isSubmitting}
        />
        {errors.email && 
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          disabled={isSubmitting}
        />
        {errors.password && 
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>}
      </div>

      <Button
        className="w-full"
        type="submit"
      >
        Entrar
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
