import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentials } from '../errors/invalid-credentials'
import { AuthenticateUseCase } from './authenticate'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)

    })
    it('should be able to authenticate', async () => {
        
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
