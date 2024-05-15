import { Header } from "@/components/header"
import { api } from "@/data/api"
import { Task as ITask } from "@/data/types/task"
import { Task } from "@/components/task"
import { Icons } from "@/components/icons"

export const getTasks = async (): Promise<ITask[]> => {
  const response = await api("/task", {
    cache: "no-cache"
  })

  const data = await response.json()

  return data.tasks
}

const HomeTasks = async () => {
  const tasks = await getTasks()

  const totalTasks = tasks?.length
  const completedTasks = tasks?.filter((task) => task.is_completed).length

  return (
    <>
      <Header />

      <section className="max-w-2xl container mt-10 px-4 pb-6 overflow-y-auto max-h-[calc(100vh_-_16rem)] scrollbar-thumb-w-0">
        <header className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm">
            <p className="font-semibold">Tarefas criadas</p>
            <span className="bg-muted py-1 px-2 rounded-full ">{tasks?.length}</span>
          </div>

          <div className="text-sm flex items-center gap-2">
            <p className="font-semibold">Concluídas</p>
            <span className="bg-muted py-1 px-2 rounded-full">
              {completedTasks} de {totalTasks}
            </span>
          </div>
        </header>

        <div>
          {tasks?.map(task => (
            <Task
              key={task.id}
              task={task}
            />
          ))}
        </div>

        {tasks?.length <= 0 && (
          <div className="flex flex-col justify-center items-center mt-24">
            <Icons.clipboardList className="h-16 w-16" />
            <div>
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default HomeTasks