import { Task } from "@prisma/client"

import { TasksRepository } from "@/repositories/tasks-repository"

interface SearchTasksUseCaseRequest {
  userId: string
}

interface SearchTasksUseCaseResponse {
  tasks: Task[]
}

export class SearchTasksUseCase {
  constructor(
    private tasksRepository: TasksRepository
  ) {}

  async execute({
    userId
  }: SearchTasksUseCaseRequest): Promise<SearchTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyByUserId(userId)

    return { tasks }
  }
}
