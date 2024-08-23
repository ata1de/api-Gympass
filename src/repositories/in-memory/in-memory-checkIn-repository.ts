import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { CheckInRepository } from '../checkIn-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
    public items: CheckIn[] = []
    
    async findCheckInByUserIdInDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf('date')
        const endOfDay = dayjs(date).endOf('date')

        const checkIn =  this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.createdAt)

            const isSameDay = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

            return checkIn.user_id === userId && isSameDay
        })

        if (!checkIn) {
            return null
        }

        return checkIn
    }

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

    async findManyByUserId(userId: string, page: number) {
        return this.items
        .filter((checkIn) => checkIn.user_id === userId)
        .slice((page -1 ) * 20, page * 20)
    }

    async countByUserId(userId: string) {
        return this.items.filter((checkIn) => checkIn.user_id === userId).length
    }

    async findById(id: string) {
        const checkin =  this.items.find((checkIn) => checkIn.id === id)

        if (!checkin) {
            return null
        }

        return checkin
    }

    async save(checkIn: CheckIn) {
        const index = this.items.findIndex((item) => item.id === checkIn.id)

        if (index >= 0) {
            this.items[index] = checkIn
        }

        return checkIn
    }
}