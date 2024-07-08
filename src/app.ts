import fastify from 'fastify'
import { register } from './http/controllers/register'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.post('/users', register)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
