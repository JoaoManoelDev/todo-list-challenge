import { Icons } from "@/components/icons"
import { CreateTaskForm } from "@/components/task/create-task-form"
import { LogOut } from "@/components/log-out"
import { ThemeToggle } from "@/theme/toggle"

export const Header = () => {
  return (
    <header className="border-b h-[12rem] flex justify-center relative px-4 bg-muted">
      <div className="max-w-2xl container flex justify-center items-center">

        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold">TODO</span>
          <Icons.check className="w-9 h-9" />
        </div>

        <CreateTaskForm />

        <div className="absolute top-4 right-0 px-4 w-screen ">
          <div className="flex items-center justify-between lg:justify-end gap-2 w-full">
            <ThemeToggle />
            <LogOut />
          </div>
        </div>
      </div>
    </header>
  )
}
