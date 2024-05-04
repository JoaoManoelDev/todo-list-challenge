import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository"
import { SearchTasksUseCase } from "./search-tasks"

let tasksRepository: InMemoryTasksRepository
let sut: SearchTasksUseCase

describe("Search Tasks Use Case", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new SearchTasksUseCase(tasksRepository)
  })

  it("should be able to search tasks", async () => {
    tasksRepository.create({
      title: "Learning Node Js",
      user_id: "1"
    })

    tasksRepository.create({
      title: "Learning React Js",
      user_id: "1"
    })

    const { tasks } = await sut.execute({
      userId: "1"
    })

    expect(tasks).toEqual([
      expect.objectContaining({ title: "Learning Node Js" }),
      expect.objectContaining({ title: "Learning React Js" }),

    ])
  })
})
