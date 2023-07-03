import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";
import { PetsStoredData } from "@/repositories/pets-repository";

interface FindPetByIdUseCaseRequest {
    id: string
}

interface FindPetByIdUseCaseResponse {
    pet: PetsStoredData | null
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