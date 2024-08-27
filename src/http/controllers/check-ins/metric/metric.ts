import { MakeGetUserMetricsUseCase } from '@/factories/make-get-check-ins-by-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metric(request: FastifyRequest, reply: FastifyReply) {

    const historyGymUseCase = MakeGetUserMetricsUseCase()

    const { count } = await historyGymUseCase.execute({ userId: request.user.sub })

    return reply.status(200).send({
        count
    })
}
