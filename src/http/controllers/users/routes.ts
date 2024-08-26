import { VerifyJwt } from '@/middleware/auth'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate/authenticate'
import { Profile } from './profile/profile'
import { register } from './register/register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/auth', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [VerifyJwt]}, Profile)

}
