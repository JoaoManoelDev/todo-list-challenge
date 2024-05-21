import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository"
import { ToggleTaskCompletedUseCase } from "@/use-cases/toggle-task-completed"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

let tasksRepository: InMemoryTasksRepository
let sut: ToggleTaskCompletedUseCase

describe("Toggle Task Completed Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new ToggleTaskCompletedUseCase(tasksRepository)
  })

  it("should be able to toggle task completed", async () => {
    await tasksRepository.create({
      id: "task-01",
      title: "Learning Node Js",
      user_id: "user-01"
    })

    const firstToggleCompletedTask = await sut.execute({
      taskId: "task-01"
    })

    expect(firstToggleCompletedTask.task.is_completed).toEqual(true)

    const secondToggleCompletedTask = await sut.execute({
      taskId: "task-01"
    })

    expect(secondToggleCompletedTask.task.is_completed).toEqual(false)
  })

  it("should not be able to create user with the email already in use", async () => {
    await expect(() => sut.execute({
      taskId: "non-existing-task-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})