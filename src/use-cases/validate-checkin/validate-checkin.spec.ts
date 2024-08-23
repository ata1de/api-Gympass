import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LateCheckInValidationError } from "../errors/lateCheckInValidationError";
import { ResourceNotFound } from "../errors/resource-not-found";
import { ValidateCheckInUseCase } from "./validate-checkin";


let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate CheckIn Use Case', () => {
    beforeEach( async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInUseCase(checkInRepository)

        vi.useFakeTimers()

    })

    afterEach(() => {
        vi.useRealTimers()
    })
    
    it('should be able to validate check in', async () => {

        const createdCheckIn = await checkInRepository.create({
            id: 'checkInId-01',
            gym_id: 'gymId-01',
            user_id: 'userId-01'
        })


        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate check in with checkInId not exist', async () => {

        await expect(() => 
            sut.execute({
                checkInId: 'gymId-01',
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)

    })

    it('should not be able to validate check in after 20 minutes of its creation ', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

        const createdCheckIn = await checkInRepository.create({
            gym_id: 'gymId-01',
            user_id: 'userId-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() => 
            sut.execute({
                checkInId: createdCheckIn.id,
            })
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })

})