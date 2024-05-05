import { ToggleTaskCompleted } from "../toggle-task-completed"
import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository"

export const makeToggleTaskCompletedTaskUseCase = () => {
  const prismaTasksRepository = new PrismaTasksRepository()
  const toggleTaskCompleted = new ToggleTaskCompleted(prismaTasksRepository)

  return toggleTaskCompleted
}
