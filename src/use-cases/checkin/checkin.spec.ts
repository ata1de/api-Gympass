import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-respository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./checkin-use-case";


let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
    beforeEach( async () => {
        checkInRepository = new InMemoryCheckInRepository()
        gymRepository = new InMemoryGymRepository()
        sut = new CheckInUseCase(checkInRepository, gymRepository)

        vi.useFakeTimers()

        await gymRepository.create({
            name: 'gymId-01',
            latitude: -8.126464,
            longitude: -34.9077504,
            description: 'Academia Teste',
            phone: '123456789',
        })

    })

    afterEach(() => {
        vi.useRealTimers()
    })
    
    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01',
            userLatitude: -8.126464,
            userLongitude: -34.9077504

        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    
    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01',
            userLatitude: -8.126464,
            userLongitude: -34.9077504
        })

        await expect(() =>
            sut.execute({
                gymId: 'gymId-01',
                userId: 'userId-01',
                userLatitude: -8.126464,
                userLongitude: -34.9077504
            }), 
        ).rejects.toBeInstanceOf(Error)

    })

    it('should be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01',
            userLatitude: -8.126464,
            userLongitude: -34.9077504
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01',
            userLatitude: -8.126464,
            userLongitude: -34.9077504
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

    it('should not be able to check in on distant gym', async () => {
        gymRepository.items.push({
            id: 'gymId-02',
            name: 'Academia Teste',
            latitude: new Decimal(-8.1866162),
            longitude: new Decimal(-34.9224866),
            description: 'Academia Teste',
            phone: '123456789',
        })

        await expect(() => 
            sut.execute({
            gymId: 'gymId-02',
            userId: 'userId-01',
            userLatitude: -8.126464,
            userLongitude: -34.9077504 
        })).rejects.toBeInstanceOf(Error)

    })

})