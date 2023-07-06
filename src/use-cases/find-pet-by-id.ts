import { Pet } from "@prisma/client";

import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";

interface FindPetByIdUseCaseRequest {
    id: string
}

interface FindPetByIdUseCaseResponse {
    pet: Pet | null
}

export class FindPetByIdUseCase {
    constructor(private repository: InMemoryPetsRepository) { }

    async execute(
        { id }: FindPetByIdUseCaseRequest
    ): Promise<FindPetByIdUseCaseResponse> {

        const pet = await this.repository.findUniqueById(id);

        return {
            pet
        }
    }
}