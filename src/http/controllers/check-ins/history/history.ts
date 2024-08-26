import { MakeFetchUsersUseCase } from '@/factories/make-fetch-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
    const historyBodySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = historyBodySchema.parse(request.params)

    const historyGymUseCase = MakeFetchUsersUseCase()

    const { checkIns } = await historyGymUseCase.execute({ page, userId: request.user.sub })

    return reply.status(201).send({
        checkIns
    })
}
