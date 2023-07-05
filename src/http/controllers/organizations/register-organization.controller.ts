import { FastifyReply, FastifyRequest } from "fastify";

export async function registerOrganization(request: FastifyRequest, reply: FastifyReply) {
    return reply.send({
        message: 'OK'
    });
}