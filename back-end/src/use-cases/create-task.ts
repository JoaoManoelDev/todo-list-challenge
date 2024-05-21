import { Task } from "@prisma/client"

import { TasksRepository } from "@/repositories/tasks-repository"

interface CreateTaskUseCaseRequest {
  title: string
  userId: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository
  ) { }

  async execute({
    title,
    userId
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = await this.tasksRepository.create({
      title,
      user_id: userId
    })

    return { task }
  }
}
