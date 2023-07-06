import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeFindManyByCityAndOrCharacteristics } from "@/factories/make-find-many-by-city-and-or-characteristics";

export async function findManyByCityAndOrCharacteristics(request: FastifyRequest, reply: FastifyReply) {
    const findManyQuerySchema = z.object({
        city: z.string(),
        state: z.string().max(2).min(2).toUpperCase(),
        energy_level: z.coerce.number().min(0).max(5).optional(),
        type: z.enum(['Cachorro', 'Gato']).optional(),
        age: z.enum(['Filhote', 'Adulto']).optional(),
        size: z.enum(['Pequeno', 'Medio', 'Grande']).optional(),
        independency_level: z.enum(['Baixo', 'Medio', 'Alto']).optional(),
    })

    const { city, state, ...searchParams } = findManyQuerySchema.parse(request.query);

    try {
        const useCase = makeFindManyByCityAndOrCharacteristics();
        const { pets } = await useCase.execute({
            city,
            state,
            searchParams
        })

        return reply.status(200).send({
            pets
        })
    } catch (error) {
        throw error;
    }
}