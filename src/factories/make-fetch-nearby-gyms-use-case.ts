import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { FetchNearbyGymsUseCase } from "@/use-cases/fetch-nearby-gyms/fetch-nearby-gyms-use-case";

export function MakeFetchNearbyGymsUseCase() {
    const prismaGymsRepository = new PrismaGymRepository();
    const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(prismaGymsRepository);
    
    return fetchNearbyGymsUseCase;
}