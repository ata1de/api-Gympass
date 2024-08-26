import { VerifyJwt } from "@/middleware/auth"
import { FastifyInstance } from "fastify"

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', VerifyJwt)

    // app.post('/gyms', create)
    
    // app.get('/gyms/search', search)
    // app.get('/gyms/nearby', nearby)
}