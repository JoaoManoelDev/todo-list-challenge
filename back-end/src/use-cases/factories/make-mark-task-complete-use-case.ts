import { MarkTaskCompleteUseCase } from "../mark-task-complete"
import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository"

export const makeMarkTaskCompleteTaskUseCase = () => {
  const prismaTasksRepository = new PrismaTasksRepository()
  const markTaskCompleteUseCase = new MarkTaskCompleteUseCase(prismaTasksRepository)

  return markTaskCompleteUseCase
}
