import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeRegisterOrganizationUseCase } from "@/factories/make-register-organization-use-case";
import { UniqueViolation } from "@/use-cases/errors/unique-violation-error";

export async function registerOrganization(request: FastifyRequest, reply: FastifyReply) {
    const registerOrganizationBodySchema = z.object({
        name: z.string().max(20),
        email: z.string().email(),
        responsible_name: z.string().max(20).nullable(),
        whats_app: z.string().refine(value => {
            const phoneNumberPattern = /^[0-9]{2}9[0-9]{8}$/;
            return phoneNumberPattern.test(value);
        }, {
            message: 'Phone number format invalid'
        }),
        password: z.string().min(6),
        city: z.string().max(20),
        state: z.string().length(2).toUpperCase(),
        address: z.string().max(40),
        zip_code: z.string().max(9).nullable()
    });

    const organizationData = registerOrganizationBodySchema.parse(request.body);

    try {
        const useCase = makeRegisterOrganizationUseCase();

        await useCase.execute(organizationData);

        return reply.status(201).send();

    } catch (error) {
        if (error instanceof UniqueViolation) {
            return reply.status(409).send({
                message: error.message
            })
        }

        throw error;
    }

}