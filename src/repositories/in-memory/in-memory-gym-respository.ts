import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinate'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { FetchNearbyGymsUseCaseProps, GymRepository } from '../gyms-repository'

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
            id: data.id ?? randomUUID(),
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

    async findByQuery(query: string, page: number) {
        return this.items
        .filter((gym) => gym.name.includes(query))
        .slice((page - 1) * 20, page * 20)
    }

    async fetchManyNearby({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseProps) {
        return this.items.filter((gym) => {
            const distance = getDistanceBetweenCoordinates(
                {latitude: userLatitude, longitude: userLongitude},
                {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
            )

            return distance < 10
        })
    }

}