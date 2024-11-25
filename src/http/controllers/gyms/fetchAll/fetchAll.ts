import { MakeFetchAllUseCase } from "@/factories/make-fetch-all-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
    const fetchAllSchema = z.object({
        categories: z.array(z.string()).default([]),
        plans: z.array(z.string()).default([]),
        page: z.number().optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),

    })

    const { categories, plans, page, limit, offset } = fetchAllSchema.parse(request.query)

    const pagination = {
        page,
        limit,
        offset
    }

    const fetchAllGymsUseCase = MakeFetchAllUseCase()

    const { gyms, page: paginationPage, perPage } = await fetchAllGymsUseCase.execute({ categories, plans, pagination })

    return reply.send({
        page: paginationPage,
        perPage,
        gyms
    })

}