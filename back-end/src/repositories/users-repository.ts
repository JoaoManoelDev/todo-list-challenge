import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
  create(user: Prisma.UserUncheckedCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
