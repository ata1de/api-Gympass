import { FastifyReply, FastifyRequest } from "fastify";

export type PaginationQuery = {
    page?: string | number,
    limit?: string | number,
    offset?: string | number
}

export async function Pagination(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = request.query as PaginationQuery

    request.query = {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        offset: page ? (Number(page) - 1) * Number(limit) : 0
    }
}