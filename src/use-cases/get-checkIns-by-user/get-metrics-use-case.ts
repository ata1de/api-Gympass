import { CheckInRepository } from '@/repositories/checkIn-repository';

interface GetUserMetricsUseCaseProps {
    userId: string;
}

interface GetUserMetricsUseCaseResponse {
  count: number
}
export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseProps): Promise<GetUserMetricsUseCaseResponse> {
    const count = await this.checkInRepository.countByUserId(userId)

    return {
        count
    }
  }
}
