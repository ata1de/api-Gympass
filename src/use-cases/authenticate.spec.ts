import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentials } from './errors/invalid-credentials'

describe('Authenticate Use Case', () => {
    it('should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
        email: 'johndoe@email.com',
        password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))

    })

    it('should not be able authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => 
            sut.execute({
                email: 'wrongemail',
                password: '123456',
        })).rejects.toBeInstanceOf(InvalidCredentials)
  
    })

    it('should not be able authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => 
            sut.execute({
                email: 'johndoe@email.com',
                password: '1234567',
        })).rejects.toBeInstanceOf(InvalidCredentials)
  
    })
})
