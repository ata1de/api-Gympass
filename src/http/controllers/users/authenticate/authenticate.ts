import { MakeAuthenticateUseCase } from '@/factories/make-authenticate-use-case'
import { InvalidCredentials } from '@/use-cases/errors/invalid-credentials'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const authenticateUseCase = MakeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: user.role
      },
      { sign: {
        // expiresIn: '1h',
        sub: user.id.toString(),
      } }
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      { sign: {
        expiresIn: '7d',
        sub: user.id.toString(),
      } }
    )

    return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: true
    })
    .status(200)
    .send({
      user: {
        ...user,
        password_hash: undefined,
      },
      token
    })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

}
