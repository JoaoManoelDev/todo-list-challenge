import { randomUUID } from "node:crypto"
import { Prisma, Task } from "@prisma/client"

import { TasksRepository } from "../tasks-repository"

export class InMemoryTasksRepository implements TasksRepository {
  public tasks: Task[] = []

  async create(task: Prisma.TaskUncheckedCreateInput) {
    const newTask = {
      id: randomUUID(),
      title: task.title,
      is_completed: false,
      user_id: task.user_id
    }

    this.tasks.push(newTask)

    return newTask
  }
}
