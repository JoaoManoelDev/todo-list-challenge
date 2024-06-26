import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { UpdateTaskUseCase } from "@/use-cases/update-task"

let tasksRepository: InMemoryTasksRepository
let sut: UpdateTaskUseCase

describe("Update Task Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateTaskUseCase(tasksRepository)
  })

  it("should be able to update task", async () => {
    await tasksRepository.create({
      id: "task-01",
      title: "Learning Node Js",
      user_id: "user-01"
    })

    const { task } = await sut.execute({
      taskId: "task-01",
      taskUpdate: {
        title: "Updated task",
        isCompleted: true
      }
    })

    expect(task).toMatchObject({ title: "Updated task", is_completed: true })
  })

  it("Should not be able to update task with an id that doesn't exist", async () => {
    await expect(() => sut.execute({
      taskId: "non-exists-task-id",
      taskUpdate: {
        title: "Updated task",
        isCompleted: true
      }
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})