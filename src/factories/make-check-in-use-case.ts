import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";
import { CheckInUseCase } from "@/use-cases/checkin/checkin-use-case";

export function MakeCheckInUseCase() {
    const prismaCheckInRepository = new PrismaCheckInRepository();
    const prismaGymsRepository = new PrismaGymRepository();
    
    const checkInUseCase = new CheckInUseCase(prismaCheckInRepository , prismaGymsRepository);

    return checkInUseCase;
}