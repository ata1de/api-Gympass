import { Gym } from '@prisma/client'
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
}