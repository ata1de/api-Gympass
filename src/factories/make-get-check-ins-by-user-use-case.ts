import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { GetUserMetricsUseCase } from "@/use-cases/get-checkIns-by-user/get-metrics-use-case";

export function MakeGetUserMetricsUseCase() {
    const prismaCheckRepository = new PrismaCheckInRepository();
    const getUserMetricsUseCase = new GetUserMetricsUseCase(prismaCheckRepository);

    return getUserMetricsUseCase;
}