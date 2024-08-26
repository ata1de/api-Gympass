import { MakeSearchGymsUseCase } from '@/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchBodySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { query, page } = searchBodySchema.parse(request.params)

    const searchGymUseCase = MakeSearchGymsUseCase()

    const { gyms } = await searchGymUseCase.execute({ query, page })

    return reply.status(201).send({
        gyms
    })
}
