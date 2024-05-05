import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository"
import { ToggleTaskCompleted } from "./toggle-task-completed"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let tasksRepository: InMemoryTasksRepository
let sut: ToggleTaskCompleted

describe("Toggle Task Completed Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new ToggleTaskCompleted(tasksRepository)
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

  it("should not be able to toggle completed task with wrong id", async () => {
    await expect(() => sut.execute({
      taskId: "non-existing-task-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})