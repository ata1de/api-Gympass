import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-checkIn-repository";
import { FetchUsersHistoryUseCase } from "@/use-cases/fetch-users/fetch-users-checkIns-history-use-case";

export function MakeFetchUsersUseCase() {
    const prismaCheckRepository = new PrismaCheckInRepository();
    const fetchUsersUseCase = new FetchUsersHistoryUseCase(prismaCheckRepository);

    return fetchUsersUseCase;
}