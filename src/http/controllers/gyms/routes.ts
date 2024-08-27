import { VerifyJwt } from "@/middleware/auth"
import { verifyUserRole } from "@/middleware/role"
import { FastifyInstance } from "fastify"
import { create } from "./createGym/create"
import { nearby } from "./nearby/nearby"
import { search } from "./search/search"

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', VerifyJwt)

    app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')]}, create)
    
    app.get('/gyms/nearby', nearby)
    app.get('/gyms/search/:query/:page', search)
}