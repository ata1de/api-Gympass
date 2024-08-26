import { MakeCheckInUseCase } from '@/factories/make-check-in-use-case'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-checkIn-number'
import { MaxDistanceError } from '@/use-cases/errors/max-distance'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        userLatitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const createParamsSchema = z.object({
        gymId: z.string()
    })

    try {
        const {  userLatitude, userLongitude } = createBodySchema.parse(request.body)
        const { gymId } = createParamsSchema.parse(request.query)

        const createGymUseCase = MakeCheckInUseCase()

        await createGymUseCase.execute({ userLatitude, userLongitude, gymId, userId: request.user.sub })

        return reply.status(201).send()
    } catch (error) {
        if (error instanceof ResourceNotFound || error instanceof MaxNumberOfCheckInsError || error instanceof MaxDistanceError) {
            return reply.status(400).send({ message: error.message })
        }
    }
}
