import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";
import { PetsStoredData } from "@/repositories/pets-repository";

interface SearchPetsInTownUseCaseRequest {
    city: string
}

interface SearchPetsInTownUseCaseResponse {
    pets: PetsStoredData[]
}

export class SearchPetsInTownUseCase {
    constructor(private repository: InMemoryPetsRepository) { }

    async execute(
        { city }: SearchPetsInTownUseCaseRequest
    ): Promise<SearchPetsInTownUseCaseResponse> {
        const pets = await this.repository.findManyByCity(city);

        return {
            pets
        }
    }
}