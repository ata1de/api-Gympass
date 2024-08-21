import { CheckInRepository } from "@/repositories/checkIn-repository";
import { GymRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinate";
import { CheckIn } from "@prisma/client";
import { ResourceNotFound } from "../errors/resource-not-found";


interface CheckInUseCaseRequest {
    gymId: string;
    userId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private userRepository: CheckInRepository,
        private gymRepository: GymRepository
    ) {}

    async execute({gymId, userId, userLatitude, userLongitude}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
        const gym = await this.gymRepository.findGymById(gymId)

        if (!gym) {
            throw new ResourceNotFound()
        }
        
        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error()
        }
    
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