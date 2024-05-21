import { User } from "@prisma/client"

import { UsersRepository } from "@/repositories/users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { passwordHash } from "@/lib/hash"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({
    name,
    email,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHashed = await passwordHash({ password })


    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHashed
    })

    return { user }
  }
}
