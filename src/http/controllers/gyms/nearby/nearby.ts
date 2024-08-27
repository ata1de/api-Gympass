import { MakeFetchNearbyGymsUseCase } from '@/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyBodySchema = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = nearbyBodySchema.parse(request.query)

    const fetchNearbyGymUseCase = MakeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGymUseCase.execute({ userLatitude:latitude, userLongitude:longitude })

    return reply.status(201).send({
        gyms
    })
}
