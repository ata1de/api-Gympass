import { prisma } from '@/lib/prisma'
import { PaginationQuery } from '@/middleware/pagination'
import { Gym, Prisma } from '@prisma/client'
import { FetchNearbyGymsUseCaseProps, GymRepository } from '../gyms-repository'

export class PrismaGymRepository implements GymRepository {
  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findGymById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
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
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return gyms
  }

  async fetchManyNearby({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseProps): Promise<Gym[]> {
    const nearbyLatitude = 0.09
    const nearbyLongitude = 0.09

    const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE latitude BETWEEN ${userLatitude - nearbyLatitude} AND ${userLatitude + nearbyLatitude}
            AND longitude BETWEEN ${userLongitude - nearbyLongitude} AND ${userLongitude + nearbyLongitude}
        `
    return gyms
  }

  async findAll(category: string[], plans: string[], pagination: PaginationQuery) {
    const gyms = await prisma.gym.findMany({
      where: {
        category: {
          in: category,
        },
        plan: {
          in: plans,
        }
      },
      skip: Number(pagination.offset),
      take: Number(pagination.limit),
    })

    return gyms
  }
}
