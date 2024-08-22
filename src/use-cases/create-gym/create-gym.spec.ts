import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-respository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym-use-case'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should create a new gym', async () => {

    const { gym } = await sut.execute({
      title: 'gym-01',
      description: 'A melhor academia do bairro',
      latitude: -8.126464,
      longitude: -34.9077504,
      phone: '99999999999'
    })

    expect(gym.id).toEqual(expect.any(String))

  })
  

})
