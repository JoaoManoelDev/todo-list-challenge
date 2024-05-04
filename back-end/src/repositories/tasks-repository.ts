import { Prisma, Task } from "@prisma/client"

export interface TasksRepository {
  create(task: Prisma.TaskUncheckedCreateInput): Promise<Task>
}