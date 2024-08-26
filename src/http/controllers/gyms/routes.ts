import { VerifyJwt } from "@/middleware/auth"
import { FastifyInstance } from "fastify"
import { create } from "./createGym/create"
import { nearby } from "./nearby/nearby"
import { search } from "./search/search"

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', VerifyJwt)

    app.post('/gyms', create)
    
    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)
}