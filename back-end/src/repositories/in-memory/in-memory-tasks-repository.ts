import { randomUUID } from "node:crypto"
import { Prisma, Task } from "@prisma/client"

import { TasksRepository } from "../tasks-repository"

export class InMemoryTasksRepository implements TasksRepository {
  public tasks: Task[] = []

  async create(task: Prisma.TaskUncheckedCreateInput) {
    const newTask = {
      id: task.id ?? randomUUID(),
      title: task.title,
      is_completed: false,
      user_id: task.user_id
    }

    this.tasks.push(newTask)

    return newTask
  }

  async findManyByUserId(userId: string) {
    const tasks = this.tasks.filter(task => task.user_id === userId)

    return tasks
  }

  async findById(taskId: string) {
    const task = this.tasks.find(task => task.id === taskId)

    if (!task) return null

    return task
  }

  async delete(taskId: string) {
    const task = this.tasks.findIndex(task => task.id === taskId)

    if (task !== -1) {
      this.tasks.splice(task, 1)
    }
  }
}
