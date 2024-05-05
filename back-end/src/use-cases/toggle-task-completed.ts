import { Task } from "@prisma/client"

import { TasksRepository } from "@/repositories/tasks-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface ToggleTaskCompletedRequest {
  taskId: string
}

interface ToggleTaskCompletedResponse {
  task: Task
}

export class ToggleTaskCompleted {
  constructor(
    private tasksRepository: TasksRepository
  ) {}

  async execute({
    taskId
  }: ToggleTaskCompletedRequest): Promise<ToggleTaskCompletedResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    task.is_completed = !task.is_completed

    await this.tasksRepository.save(task)

    return { task }
  }
}
