import { Icons } from "@/components/icons"
import { CreateTaskForm } from "@/components/task/create-task-form"

export const Header = () => {
  return (
    <header className="border-b h-[12rem] flex justify-center relative px-4 bg-muted">
      <div className="max-w-2xl container flex justify-center items-center">

        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold">TODO</span>
          <Icons.check className="w-9 h-9" />
        </div>

        <CreateTaskForm />

      </div>
    </header>
  )
}
