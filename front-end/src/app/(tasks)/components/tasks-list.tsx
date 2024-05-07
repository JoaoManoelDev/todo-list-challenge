"use client"

import { Icons } from "@/components/icons"
import { Task } from "@/components/task"
import { useTaskContext } from "@/contexts/task"

interface Task {
  id: string
  title: string
  is_completed: boolean
}

export const TasksList = () => {
  const { tasks, isLoading } = useTaskContext()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.is_completed).length

  return (
    <section className="max-w-2xl container mt-10 px-4 pb-6 overflow-y-auto max-h-[calc(100vh_-_16rem)] scrollbar-thumb-w-0">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-sm">
          <p className="font-semibold">Tarefas criadas</p>
          <span className="bg-muted py-1 px-2 rounded-full ">{tasks.length}</span>
        </div>

        <div className="text-sm flex items-center gap-2">
          <p className="font-semibold">Concluídas</p>
          <span className="bg-muted py-1 px-2 rounded-full">
            {completedTasks} de {totalTasks}
          </span>
        </div>
      </header>

      <div>
        {isLoading ? (
          <p>Carregando tasks</p>
        ): (
          tasks?.map(task => (
            <Task
              id={task.id}
              title={task.title}
              is_completed={task.is_completed}
              key={task.id}
            />
          ))
        )}
  
      </div>

      {tasks.length <= 0 && (
        <div className="flex flex-col justify-center items-center mt-24">
          <Icons.clipboardList className="h-16 w-16" />
          <div>
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        </div>
      )}
    </section>
  )
}