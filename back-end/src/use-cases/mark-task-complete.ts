import { Task } from "@prisma/client"

import { TasksRepository } from "@/repositories/tasks-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface MarkTaskCompleteUseCaseRequest {
  taskId: string
}

interface MarkTaskCompleteUseCaseResponse {
  task: Task
}

export class MarkTaskCompleteUseCase {
  constructor(
    private tasksRepository: TasksRepository
  ) {}

  async execute({
    taskId
  }: MarkTaskCompleteUseCaseRequest): Promise<MarkTaskCompleteUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    task.is_completed = true

    await this.tasksRepository.save(task)

    return { task }
  }
}
