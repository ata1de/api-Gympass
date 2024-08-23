import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms-use-case";


let gymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Use Case', () => {
    beforeEach( async () => {
        gymRepository = new InMemoryGymRepository()
        sut = new FetchNearbyGymsUseCase(gymRepository)

    })

    
    it('should be able to fetch nearby gyms', async () => {
        await gymRepository.create({
            id: 'gymId-01',
            name: 'Nearby Academy',
            description: 'A melhor academia do bairro',
            latitude: -8.126464,
            longitude: -34.9077504,
            phone: '99999999999'

        })
        await gymRepository.create({
            id: 'gymId-02',
            name: 'Longer Academy',
            description: 'A melhor academia do bairro',
            latitude: -7.9497852,
            longitude: -35.117234,
            phone: '99999999999'

        })

        const { gyms } = await sut.execute({
            userLatitude: -8.126464,
            userLongitude: -34.9077504
        })

        expect(gyms).have.length(1)
        expect(gyms).toEqual([ expect.objectContaining({ name: 'Nearby Academy'})])
    })
})