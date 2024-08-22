import { CheckInRepository } from '@/repositories/checkIn-repository';
import { CheckIn } from '@prisma/client';

interface FetchUsersHistoryUseCaseProps {
    userId: string;
    page: number
}

interface FetchUsersHistoryUseCaseResponse {
  checkIns: CheckIn[]
}
export class FetchUsersHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    userId,
    page
  }: FetchUsersHistoryUseCaseProps): Promise<FetchUsersHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
        checkIns
    }
  }
}
