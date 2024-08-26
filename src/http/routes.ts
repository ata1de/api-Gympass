import { VerifyJwt } from '@/middleware/auth'
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate/authenticate'
import { Profile } from './controllers/profile'
import { register } from './controllers/register/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/auth', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [VerifyJwt]}, Profile)

}
