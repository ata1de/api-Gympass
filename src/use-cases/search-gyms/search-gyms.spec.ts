import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms-use-case";


let gymRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('CheckIn Use Case', () => {
    beforeEach( async () => {
        gymRepository = new InMemoryGymRepository()
        sut = new SearchGymsUseCase(gymRepository)

    })

    
    it('should be able to search for gym by query', async () => {
        await gymRepository.create({
            id: 'gymId-01',
            name: 'Javascript Academy',
            description: 'A melhor academia do bairro',
            latitude: -8.126464,
            longitude: -34.9077504,
            phone: '99999999999'

        })
        await gymRepository.create({
            id: 'gymId-02',
            name: 'Java Academy',
            description: 'A melhor academia do bairro',
            latitude: -8.126464,
            longitude: -34.9077504,
            phone: '99999999999'

        })

        const { gyms } = await sut.execute({
            query: 'Java',
            page: 1
        })

        expect(gyms).have.length(2)
        expect(gyms).toEqual([
            expect.objectContaining({ id: 'gymId-01'}),
            expect.objectContaining({ id: 'gymId-02'})
        ])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymRepository.create({
                id: `gymId-0${i}`,
                name: `Javascript Academy ${i}`,
                description: 'A melhor academia do bairro',
                latitude: -8.126464,
                longitude: -34.9077504,
                phone: '99999999999'
        })}
    
        const { gyms } = await sut.execute({
            query: 'Javascript',
            page: 2
        })

        expect(gyms).have.length(2)
        expect(gyms).toEqual([
            expect.objectContaining({ id: 'gymId-021'}),
            expect.objectContaining({ id: 'gymId-022'})
        ])
    })
})