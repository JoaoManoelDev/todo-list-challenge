import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository"
import { CreateTaskUseCase } from "@/use-cases/create-task"

let tasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe("Create Task Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(tasksRepository)
  })

  it("should be able to create a task", async () => {
    const { task } = await sut.execute({
      title: "Learning Node Js",
      userId: "1"
    })

    expect(task.id).toEqual(expect.any(String))
    expect(task).toMatchObject({ title: "Learning Node Js" })
  })
})
