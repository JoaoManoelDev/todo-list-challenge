"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { http } from "@/lib/axios"

const registerForm = z.object({
  name: z.string().min(1, "O nome não pode estar vazio."),
  email: z.string().email("Digite um e-mail válido."),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
})

type RegisterForm = z.infer<typeof registerForm>


export const Form = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
  })

  const handleRegister = async (data: RegisterForm) => {
    try {
      const response = await http.post("/auth/register", data)

      if (response.status === 201) {
        router.push(`/sign-in?email=${data.email}`)
        toast.success("Cadastro finalizado com sucesso.")
      }

    } catch (error) {
      if (error instanceof AxiosError) {
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
        {errors.name &&
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>}
      </div>

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
