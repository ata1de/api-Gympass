import { VerifyJwt } from "@/middleware/auth"
import { FastifyInstance } from "fastify"
import { create } from "./create/create"
import { history } from "./history/history"
import { metric } from "./metric/metric"
import { validate } from "./validate/validate"

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', VerifyJwt)

    app.post('/gyms/:gymId/check-ins', create)
    
    app.patch('/check-ins/:checkInId/validate', validate)

    app.get('/check-ins/metric', metric)
    app.get('/check-ins/history', history)

}