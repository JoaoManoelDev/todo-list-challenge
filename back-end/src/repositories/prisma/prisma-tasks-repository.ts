import { Prisma, Task } from "@prisma/client"

import { TasksRepository } from "../tasks-repository"
import { prisma } from "@/lib/prisma"

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({
      data
    })
    
    return task
  }

  async findManyByUserId(userId: string) {
    const tasks = await prisma.task.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc"
      }
    })

    return tasks
  }

  async findById(taskId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })
    
    if (!task) return null

    return task
  }

  async save(newTask: Task) {
    const task = await prisma.task.update({
      where: {
        id: newTask.id
      },
      data: newTask
    })

    return task
  }

  async delete(taskId: string) {
    await prisma.task.delete({
      where: {
        id: taskId
      }
    })

    return
  }
}