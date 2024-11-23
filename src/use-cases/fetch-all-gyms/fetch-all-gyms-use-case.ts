import { GymRepository } from "@/repositories/gyms-repository";

interface FetchAllUseCaseProps {
    categories: string[]
    plans: string[]
}

export class FetchAllUseCase {
    constructor(private gymsRepository: GymRepository) {}

    async execute({
        categories,
        plans,
    }: FetchAllUseCaseProps) {
        const gyms = await this.gymsRepository.findAll(
            categories,
            plans
        )

        return {
            gyms
        }
    }
}