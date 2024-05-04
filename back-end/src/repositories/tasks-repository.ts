import { Prisma, Task } from "@prisma/client"

export interface TasksRepository {
  create(task: Prisma.TaskUncheckedCreateInput): Promise<Task>
  findManyByUserId(userId: string): Promise<Task[]>
  findById(taskId: string): Promise<Task | null>
  delete(taskId: string): Promise<void>
  save(task: Task): Promise<Task>
}