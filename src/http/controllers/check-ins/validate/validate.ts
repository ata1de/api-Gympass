import { MakeValidateCheckInUseCase } from '@/factories/make-validate-check-in-use-case'
import { LateCheckInValidationError } from '@/use-cases/errors/late-checkIn-validation'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
    const validateParamsSchema = z.object({
        checkInId: z.string()
    })

    try {
        const { checkInId } = validateParamsSchema.parse(request.params)

        const validateGymUseCase = MakeValidateCheckInUseCase()

        await validateGymUseCase.execute({ checkInId })

        return reply.status(204).send()
    } catch (error) {
        if (error instanceof ResourceNotFound || error instanceof LateCheckInValidationError) {
            return reply.status(400).send({ message: error.message })
        }
    }
}
