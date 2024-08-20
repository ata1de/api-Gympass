import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInUseCase } from "./checkin-use-case";


let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository)

    })
    
    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gymId-01',
            userId: 'userId-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})