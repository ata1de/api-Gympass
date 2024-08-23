import { CheckInRepository } from "@/repositories/checkIn-repository";
import { GymRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinate";
import { CheckIn } from "@prisma/client";
import { MaxNumberOfCheckInsError } from "../errors/max-checkIn-number";
import { MaxDistanceError } from "../errors/max-distance";
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
        private checkInRepository: CheckInRepository,
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
            throw new MaxDistanceError()
        }
    
        const checkInOnSameDay = await this.checkInRepository.findCheckInByUserIdInDate(userId, new Date())

        if (checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()        
        }

        
       const checkIn = await this.checkInRepository.create({
              gym_id: gymId,
              user_id: userId
         })
    
          return { checkIn }
    }
}