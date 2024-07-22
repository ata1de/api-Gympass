import { CheckIn, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CheckInRepository } from '../checkIn-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
    public items: CheckIn[] = []
    
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn: CheckIn = {
            id: randomUUID(),
            gym_id: data.gym_id,
            user_id: data.user_id,
            createdAt: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null
        }

        this.items.push(checkIn)

        return checkIn
    }
}