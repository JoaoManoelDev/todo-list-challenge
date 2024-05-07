"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"
import { toast } from "sonner"

import { http } from "@/lib/axios"

export interface Task {
  id: string
  title: string 
  is_completed: boolean
}

export interface UpdateTask {
  task: {
    title: string 
    isCompleted: boolean
  },
  taskId: string
}

interface TaskContextType {
  tasks: Task[] | []
  isLoading: boolean
  createTask: (data: {title: string}) => Promise<void>
  updateTask: (data: UpdateTask) => Promise<void>
  toggleTaskCompleted: (taskId: string) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  logOut: () => Promise<void>
}

export const TaskContext = createContext({} as TaskContextType)

interface TaskContextProviderProps {
  children: React.ReactNode
}

export const TaskContextProvider = ({
  children
}: TaskContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[] | []>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const deleteTask = async (taskId: string) => {
    const response = await http.delete(`/task/${taskId}`)

    if (response.status === 401) logOut()

    if (response.status === 204) {
      setTasks(state => state.filter(task => task.id !== taskId))
    }
  }

  const toggleTaskCompleted = async (taskId: string) => {
    const response = await http.patch(`/task/toggle-completed/${taskId}`)

    if (response.status === 401) logOut()

    if (response.status === 200) {
      setTasks(state => 
        state.map(task => 
          task.id === taskId ? { ...task, is_completed: response.data.task.is_completed } : task
        )
      )
    }
  }

  const createTask = async (data: { title: string }) => {
    const response = await http.post("/task", data)

    if (response.status === 201) {
      setTasks((state) => [...state, {
        id: response.data.id,
        title: response.data.title,
        is_completed: response.data.is_completed,
      }])
    }
  }

  const updateTask = async ({ task, taskId }: UpdateTask) => {
    const response = await http.put(`/task/${taskId}`, task)

    if (response.status === 401) logOut()

    setTasks(state => 
      state.map(task => 
        task.id === taskId ? {
          ...task,
          is_completed: response.data.task.is_completed,
          title: response.data.task.title
        } : task
      )
    )
  }

  const logOut = async () => {
    deleteCookie("@todo:token-auth")
    
    router.push("/sign-in")
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoading(true)
        const response = await http.get("/task")

        if (response) {
          setTasks(response.data.tasks)
        }
      } catch(error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            logOut()
          }
        }

        toast.message("Não foi possível buscar suas tarefas. Por favor, tente novamente mais tarde.")

      }finally {
        setIsLoading(false)
      }
    }

    getTasks()
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        createTask,
        toggleTaskCompleted,
        deleteTask,
        updateTask,
        logOut
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)

  return context
}
