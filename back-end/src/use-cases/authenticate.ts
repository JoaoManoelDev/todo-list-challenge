import { User } from "@prisma/client"

import { UsersRepository } from "@/repositories/users-repository"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import { comparePassword } from "@/lib/hash"

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User,
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({
    email,
    password
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await comparePassword({
      password,
      hash: user.password_hash
    })

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}