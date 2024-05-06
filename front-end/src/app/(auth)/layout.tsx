import { Icons } from "@/components/icons"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({
  children
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 antialiased">
      <div className="h-full border-r border-foreground/5 bg-muted p-10 text-muted-foreground hidden lg:flex flex-col justify-between">
        <div className="flex items-center gap-2 text-lg text-foreground">
          <span className="font-semibold">Todo App</span>
          <Icons.check className="w-5 h-5" />
        </div>

        <p className="text-primary text-3xl font-bold text-center font-montserrat">
          Seu app favorito para gerenciamento de tarefas. Simples, fácil e grátis!
        </p>

        <footer className="text-sm">
          João Manoel dev &copy; todo app - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout