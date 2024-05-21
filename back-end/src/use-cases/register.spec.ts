import { beforeEach, describe, expect, it } from "vitest"

import { RegisterUseCase } from "@/use-cases/register"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { comparePassword } from "@/lib/hash"
import {
  InMemoryUsersRepository
} from "@/repositories/in-memory/in-memory-users-repository"

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456"
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456"
    })

    const isPasswordCorrectlyHashed = await comparePassword({
      password: "123456",
      hash: user.password_hash
    })

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not be able to create user with the email already in use", async () => {
    const email = "johndoe@email.com"

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456"
    })

    await expect(() => sut.execute({
      name: "John Doe",
      email,
      password: "123456"
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
