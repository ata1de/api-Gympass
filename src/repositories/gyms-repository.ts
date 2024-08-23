import { Gym, Prisma } from "@prisma/client";

export interface FetchNearbyGymsUseCaseProps {
    userLatitude: number,
    userLongitude: number,
}

export interface GymRepository {
    create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>,
    findGymById(id: string): Promise<Gym | null>,
    findByQuery: (query: string, page: number) => Promise<Gym[]>,
    fetchManyNearby(params: FetchNearbyGymsUseCaseProps): Promise<Gym[]>
}