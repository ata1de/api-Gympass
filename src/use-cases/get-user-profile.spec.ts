import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFound } from './errors/resource-not-found'
import { GetUserProfileUseCase } from './get-user-profile'


let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)

    })
    it('should be able to get user profile', async () => {
        
        const createUser  = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            id: createUser.id,
        })

        expect(user.name).toEqual('John Doe')

    })

    it('should not be able get user profile with wrong id', async () => {
        await expect(() => 
            sut.execute({
                id: 'wrongid',
        })).rejects.toBeInstanceOf(ResourceNotFound)
  
    })

})
