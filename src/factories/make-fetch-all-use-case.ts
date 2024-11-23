import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { FetchAllUseCase } from "@/use-cases/fetch-all-gyms/fetch-all-gyms-use-case";

export const MakeFetchAllUseCase = () => {
    const prismaGymsRepository = new PrismaGymRepository();
    const fetchAllUseCase = new FetchAllUseCase(prismaGymsRepository);

    return fetchAllUseCase;
}