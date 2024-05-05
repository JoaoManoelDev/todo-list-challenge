import { UpdateTaskUseCase } from "../update-task"
import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository"

export const makeUpdateTaskUseCase = () => {
  const prismaTasksRepository = new PrismaTasksRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(prismaTasksRepository)

  return updateTaskUseCase
}
