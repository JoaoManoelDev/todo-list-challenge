import { CreateTaskUseCase } from "../create-task"
import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository"

export const makeCreateTaskUseCase = () => {
  const prismaTasksRepository = new PrismaTasksRepository()
  const createTaskUseCase = new CreateTaskUseCase(prismaTasksRepository)

  return createTaskUseCase
}
