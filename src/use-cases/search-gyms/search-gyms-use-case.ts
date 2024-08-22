import { GymRepository } from '@/repositories/gyms-repository';
import { Gym } from '@prisma/client';

interface SearchGymsUseCaseProps {
    query: string,
    page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}
export class SearchGymsUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    query,
    page
  }: SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findByQuery(query, page)

    return {
        gyms
    }
  }
}
