import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { FetchNearbyGymsUseCaseProps, GymRepository } from "../gyms-repository";

export class PrismaGymRepository implements GymRepository {
    async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }

    async findGymById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findUnique({
            where: {
                id
            }
        })

        if (!gym) {
            return null
        }

        return gym
    }

    async findByQuery(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                name: {
                    contains: query
                }
            },
            skip: (page - 1) * 20,
            take: 20
        })


        return gyms
    }

    async fetchManyNearby({ userLatitude, userLongitude}: FetchNearbyGymsUseCaseProps): Promise<Gym[]> {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10

        `
        return gyms
    }
    
}