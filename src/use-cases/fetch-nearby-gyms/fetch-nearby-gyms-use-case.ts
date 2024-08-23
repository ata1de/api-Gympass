import { GymRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface FetchNearbyGymsUseCaseProps {
    userLatitude: number,
    userLongitude: number,
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}
export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsUseCaseProps): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.fetchManyNearby({ userLatitude, userLongitude })

    return {
        gyms
    }
  }
}
