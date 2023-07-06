import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeRegisterPetUseCase } from "@/factories/make-register-pet-use-case";

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
    const registerPetBodySchema = z.object({
        name: z.string().max(20),
        about: z.string().max(120).nullable(),
        age: z.enum(['Filhote', 'Adulto']),
        size: z.enum(['Pequeno', 'Medio', 'Grande']),
        energy_level: z.coerce.number().min(0).max(5),
        independency_level: z.enum(['Baixo', 'Medio', 'Alto']),
        requirements: z.array(z.string()).default([]),
        type: z.enum(['Cachorro', 'Gato']),
        city: z.string().max(20),
        state: z.string().length(2).toUpperCase(),
    })

    const registerPetTokenSchema = z.object({
        sub: z.string().uuid()
    })

    const petData = registerPetBodySchema.parse(request.body);
    const organizationId = registerPetTokenSchema.parse(request.user);

    try {
        const data = {
            ...petData,
            organization_id: organizationId.sub
        }

        const useCase = makeRegisterPetUseCase();
        await useCase.execute({ petData: data })

        return reply.status(201).send()

    } catch (error) {
        throw error;
    }
}