import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository"
import { MarkTaskCompleteUseCase } from "./mark-task-complete"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let tasksRepository: InMemoryTasksRepository
let sut: MarkTaskCompleteUseCase

describe("Mark Task Complete Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new MarkTaskCompleteUseCase(tasksRepository)
  })

  it("should be able to mark task complete", async () => {
    await tasksRepository.create({
      id: "task-01",
      title: "Learning Node Js",
      user_id: "user-01"
    })

    const { task } = await sut.execute({
      taskId: "task-01"
    })

    expect(task.is_completed).toEqual(true)
  })

  it("should not be able to mark complete task with wrong id", async () => {
    await expect(() => sut.execute({
      taskId: "non-existing-task-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})