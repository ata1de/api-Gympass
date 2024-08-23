import { CheckInRepository } from "@/repositories/checkIn-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFound } from "../errors/resource-not-found";


interface ValidateCheckInUseCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    constructor(
        private checkInRepository: CheckInRepository,
    ) {}

    async execute({checkInId}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{
        const checkIn = await this.checkInRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFound()
        }

        checkIn.validated_at = new Date()

        await this.checkInRepository.save(checkIn)
    
        return { checkIn }
    }
}