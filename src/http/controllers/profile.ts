import { MakeGetUserProfileUseCase } from "@/factories/make-get-user-use-case";
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found";
import { FastifyReply, FastifyRequest } from "fastify";

export async function Profile(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getUserProfile = MakeGetUserProfileUseCase()

        const { user } = await getUserProfile.execute({
            id: request.user.sub
        })

        return reply.status(200).send({
            user: {
                ...user,
                password_hash: undefined
            }
        })
    } catch (error) {
        if (error instanceof ResourceNotFound) {
            return reply.status(400).send({ message: error.message })
        }
    }
}