import { FastifyRequest, FastifyReply } from 'fastify';

export async function refreshOrganizationToken(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify({ onlyCookie: true });

    const token = await reply.jwtSign({}, {
        sign: {
            sub: request.user.sub,
            expiresIn: '10m'
        }
    })

    const refreshToken = await reply.jwtSign({}, {
        sign: {
            sub: request.user.sub,
            expiresIn: '7d'
        }
    })

    return reply.status(400)
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true,
        })
        .send({
            token
        })
}