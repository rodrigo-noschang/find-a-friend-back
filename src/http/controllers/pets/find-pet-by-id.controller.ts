import { makeFindPetByIdUseCase } from "@/factories/make-find-pet-by-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findPetById(request: FastifyRequest, reply: FastifyReply) {
    const findPetByIdParamSchema = z.object({
        pet_id: z.string().uuid()
    })

    const { pet_id } = findPetByIdParamSchema.parse(request.params);

    try {
        const useCase = makeFindPetByIdUseCase();
        const { pet } = await useCase.execute({
            id: pet_id
        })

        return reply.status(200).send({
            pet
        })

    } catch (error) {
        throw error
    }
}