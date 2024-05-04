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

  async save(newTask: Task) {
    const taskIndex = this.tasks
      .findIndex(task => task.id === newTask.id)

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = newTask
    }

    return newTask
  }

  async delete(taskId: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId)

    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1)
    }
  }
}
