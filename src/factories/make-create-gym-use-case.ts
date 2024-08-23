import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { CreateGymUseCase } from "@/use-cases/create-gym/create-gym-use-case";

export function MakeCreateGymUseCase() {
    const prismaGymsRepository = new PrismaGymRepository();
    const createGymUseCase = new CreateGymUseCase(prismaGymsRepository);

    return createGymUseCase;
}