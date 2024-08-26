import { MakeCreateGymUseCase } from '@/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createBodySchema = z.object({
        title: z.string(),
        description: z.string().email().nullable(),
        phone: z.string().min(6).nullable(),
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        }),
    })

    const { title, description, phone, latitude, longitude } = createBodySchema.parse(request.body)

    const createGymUseCase = MakeCreateGymUseCase()

    const { gym } = await createGymUseCase.execute({ title, description, phone, latitude, longitude })

    return reply.status(201).send({
        gym
    })
}
