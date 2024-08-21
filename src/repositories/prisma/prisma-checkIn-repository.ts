import { prisma } from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../checkIn-repository";

export class PrismaCheckInRepository implements CheckInRepository {
    
    findCheckInByUserIdInDate(userId: string, date: Date): Promise<CheckIn | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }
}