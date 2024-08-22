import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-metrics-use-case";


let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Fetch User Metrics', () => {
    beforeEach( async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(checkInRepository)

    })

    
    it('should be able to get user metrics', async () => {
        await checkInRepository.create({
            gym_id: 'gymId-02',
            user_id: 'userId-01',

        })

        await checkInRepository.create({
            gym_id: 'gymId-03',
            user_id: 'userId-01',

        })

        const { count } = await sut.execute({
            userId: 'userId-01'
        })

        expect(count).toEqual(2)


    })
})