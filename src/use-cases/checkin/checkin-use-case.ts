import { CheckInRepository } from "@/repositories/checkIn-repository";
import { CheckIn } from "@prisma/client";


interface CheckInUseCaseRequest {
    gymId: string;
    userId: string;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(private userRepository: CheckInRepository) {}

    async execute({gymId, userId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
        const checkInOnSameDay = await this.userRepository.findCheckInByUserIdInDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new Error()        
        }

        
       const checkIn = await this.userRepository.create({
              gym_id: gymId,
              user_id: userId
         })
    
          return { checkIn }
    }
}