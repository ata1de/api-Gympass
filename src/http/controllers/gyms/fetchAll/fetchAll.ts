import { MakeFetchAllUseCase } from "@/factories/make-fetch-all-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllSchema = z.object({
        categories: z.array(z.string()).default([]),
        plans: z.array(z.string()).default([]),
    })

    const { categories, plans } = fetchAllSchema.parse(request.query)

    const fetchAllGymsUseCase = MakeFetchAllUseCase()

    const { gyms } = await fetchAllGymsUseCase.execute({ categories, plans })

    return reply.send({
        gyms
    })

}