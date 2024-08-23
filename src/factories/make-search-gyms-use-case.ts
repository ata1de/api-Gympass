import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { SearchGymsUseCase } from "@/use-cases/search-gyms/search-gyms-use-case";

export function MakeSearchGymsUseCase() {
    const prismaGymsRepository = new PrismaGymRepository();
    const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository);

    return searchGymsUseCase;
}