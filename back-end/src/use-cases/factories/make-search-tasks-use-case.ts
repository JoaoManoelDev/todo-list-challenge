import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository"
import { SearchTasksUseCase } from "../search-tasks"

export const makeSearchTasksUseCase = () => {
  const prismaTasksRepository = new PrismaTasksRepository()
  const searchTasksUseCase = new SearchTasksUseCase(prismaTasksRepository)

  return searchTasksUseCase
}
