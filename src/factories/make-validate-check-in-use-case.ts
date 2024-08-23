import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { ValidateCheckInUseCase } from "@/use-cases/validate-checkin/validate-checkin";

export function MakeValidateCheckInUseCase() {
    const prismaCheckInRepository = new PrismaCheckInRepository();
    const validateCheckInUseCase = new ValidateCheckInUseCase(prismaCheckInRepository);

    return validateCheckInUseCase;
}