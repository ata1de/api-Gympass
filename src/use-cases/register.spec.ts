import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './registerUseCase'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should register a new user', async () => {

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))

  })
  
  it('should hash user password upon registration', async () => {
    
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('should not allow registration of users with the same email', async () => {

      const email = 'johndoe@email.com'

      await sut.execute({
        name: 'John Doe',
        email,
        password: '123456'
    })

      await expect(() => 
        sut.execute({
          name: 'John Doe',
          email,
          password: '123456'
        })
      ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  }) 

})
