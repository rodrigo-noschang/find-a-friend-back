import { Pet } from "@prisma/client";

import { PetsRepository } from "@/repositories/pets-repository";

interface FindPetByIdUseCaseRequest {
    id: string
}

interface FindPetByIdUseCaseResponse {
    pet: Pet | null
}

export class FindPetByIdUseCase {
    constructor(private repository: PetsRepository) { }

    async execute(
        { id }: FindPetByIdUseCaseRequest
    ): Promise<FindPetByIdUseCaseResponse> {

        const pet = await this.repository.findUniqueById(id);

        return {
            pet
        }
    }
}