import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true })

    const token = await reply.jwtSign(
      {
        role: request.user.role
      },
      { 
        sign: {
        // expiresIn: '1h',
        sub: request.user.sub
      } }
    )

    const refreshToken = await reply.jwtSign(
      {},
      { sign: {
        expiresIn: '7d',
        sub: request.user.sub
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
      token
    })

}
