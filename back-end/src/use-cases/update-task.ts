import { Task } from "@prisma/client"

import { TasksRepository } from "@/repositories/tasks-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface UpdateTaskUseCaseRequest {
  taskId: string
  taskUpdate: {
    title: string
    isCompleted: boolean
  }
}

interface UpdateTaskUseCaseResponse {
  task: Task
}

export class UpdateTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository
  ) {}

  async execute({
    taskId,
    taskUpdate
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    task.title = taskUpdate.title
    task.is_completed = taskUpdate.isCompleted

    const updatedTask = await this.tasksRepository.save(task)

    return { task: updatedTask }
  }
}
