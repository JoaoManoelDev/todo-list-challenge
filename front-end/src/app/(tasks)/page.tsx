import { Header } from "@/components/header"
import { TasksList } from "./components/tasks-list"

const HomeTasks = async () => {
  return (
    <>
      <Header />
      <TasksList />
    </>
  )
}

export default HomeTasks