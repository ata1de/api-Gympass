import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CheckInRepository } from "../checkIn-repository";

export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }
}