import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository"
import { DeleteTaskUseCase } from "@/use-cases/delete-task"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

let tasksRepository: InMemoryTasksRepository
let sut: DeleteTaskUseCase

describe("Delete Task Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(tasksRepository)
  })

  it("should be able to delete task", async () => {
    await tasksRepository.create({
      id: "task-01",
      title: "Learning Node Js",
      user_id: "1",
    })

    await tasksRepository.create({
      id: "task-02",
      title: "Learning React Js",
      user_id: "1"
    })

    await sut.execute({ taskId: "task-01" })

    const tasks = await tasksRepository.findManyByUserId("1")

    expect(tasks).toHaveLength(1)
    expect(tasks).toEqual([
      expect.objectContaining({ title: "Learning React Js" }),
    ])
  })

  it("Should not be able to update task with an id that doesn't exist", async () => {
    await expect(() => sut.execute({
      taskId: "non-existing-task-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
