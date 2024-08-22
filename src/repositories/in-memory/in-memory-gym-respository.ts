import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { GymRepository } from '../gyms-repository'

export class InMemoryGymRepository implements GymRepository {
    public items: Gym[] = []
    
    async findGymById(id: string) {
        const gym = this.items.find((gym) => gym.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym =  {
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
          }
        
        this.items.push(gym)  
        return gym
    }
}