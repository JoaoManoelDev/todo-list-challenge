import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Form } from "./components/form"

const Register = () => {
  return (
    <section className="p-8">
      <Button
        asChild
        className="absolute right-8 top-8"
        variant="link"
      >
        <Link href="/sign-in">
          Entrar
        </Link>
      </Button>

      <div className="w-[300px] lg:w-[350px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Organize suas tarefas de forma fácil
          </p>
        </div>

        <Form />
      </div>
    </section>
  )
}

export default Register