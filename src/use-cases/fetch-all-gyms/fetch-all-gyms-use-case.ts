import { PaginationQuery } from "@/middleware/pagination";
import { GymRepository } from "@/repositories/gyms-repository";

interface FetchAllUseCaseProps {
    categories: string[]
    plans: string[]
    pagination: PaginationQuery
}

export class FetchAllUseCase {
    constructor(private gymsRepository: GymRepository) {}

    async execute({
        categories,
        plans,
        pagination
    }: FetchAllUseCaseProps) {
        const gyms = await this.gymsRepository.findAll(
            categories,
            plans,
            pagination
        )

        return {
            page: pagination.page,
            perPage: pagination.limit,
            gyms
        }
    }
}