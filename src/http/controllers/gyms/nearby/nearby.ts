import { MakeFetchNearbyGymsUseCase } from '@/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyBodySchema = z.object({
        userLatitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        userLongitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { userLatitude, userLongitude } = nearbyBodySchema.parse(request.body)

    const fetchNearbyGymUseCase = MakeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymUseCase.execute({ userLatitude, userLongitude })

    return reply.status(201).send({
        gyms
    })
}
