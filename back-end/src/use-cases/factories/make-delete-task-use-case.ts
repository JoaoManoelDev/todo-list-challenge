import { DeleteTaskUseCase } from "../delete-task"
import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository"

export const makeDeleteTaskUseCase = () => {
  const prismaTasksRepository = new PrismaTasksRepository()
  const deleteTaskUseCase = new DeleteTaskUseCase(prismaTasksRepository)

  return deleteTaskUseCase
}
