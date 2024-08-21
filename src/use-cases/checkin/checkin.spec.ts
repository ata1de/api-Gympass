import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./checkin-use-case";


let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository)

        vi.useFakeTimers()

    })

    afterEach(() => {
        vi.useRealTimers()
    })
    
    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    
    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01'
        })

        await expect(() =>
            sut.execute({
                gymId: 'gymId-01',
                userId: 'userId-01'
            }), 
        ).rejects.toBeInstanceOf(Error)

    })

    it('should be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01'
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))

    })

})