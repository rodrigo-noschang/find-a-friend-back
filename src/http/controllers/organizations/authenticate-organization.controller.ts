import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthenticateOrganizationUseCase } from "@/factories/make-authenticate-organization-use-case";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticateOrganization(request: FastifyRequest, reply: FastifyReply) {
    const authenticateOrganizationBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateOrganizationBodySchema.parse(request.body);
    const useCase = makeAuthenticateOrganizationUseCase();

    try {

        const { organization } = await useCase.execute({
            email,
            password
        });

        const token = await reply.jwtSign({}, {
            sign: {
                sub: organization.id,
                expiresIn: '10min'
            }
        })

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: organization.id,
                expiresIn: '7d'
            }
        })

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                token
            })

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({
                message: error.message
            })
        }

        throw error;
    }
}