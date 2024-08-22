import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIn-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUsersHistoryUseCase } from "./fetch-users-checkIns-history-use-case";


let checkInRepository: InMemoryCheckInRepository
let sut: FetchUsersHistoryUseCase

describe('CheckIn Use Case', () => {
    beforeEach( async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchUsersHistoryUseCase(checkInRepository)

    })

    
    it('should be able to fetch check-in history', async () => {
        await checkInRepository.create({
            gym_id: 'gymId-02',
            user_id: 'userId-01',

        })
        await checkInRepository.create({
            gym_id: 'gymId-01',
            user_id: 'userId-01',

        })

        const { checkIns } = await sut.execute({
            userId: 'userId-01',
            page: 1
        })

        expect(checkIns).have.length(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gymId-02'}),
            expect.objectContaining({ gym_id: 'gymId-01'})
        ])
    })

    it('should be able to fetch paginated user check-in history', async () => {
        for (let i = 1; i <= 22; i++ ) {
            await checkInRepository.create({
                gym_id: `gymId-${i}`,
                user_id: 'userId-01',
    
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'userId-01',
            page: 2
        })

        expect(checkIns).have.length(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gymId-21'}),
            expect.objectContaining({ gym_id: 'gymId-22'})
        ])
    })
    

})