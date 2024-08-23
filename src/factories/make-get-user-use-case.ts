import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "@/use-cases/get-user/get-user-profile";

export function MakeGetUserProfileUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository);

    return getUserProfileUseCase;
}