import { PetsRepository, PetsStoredData } from "@/repositories/pets-repository";
import { SearchPetsByCharacteristicParams } from "@/repositories/pets-repository";

interface SearchPetsByCharacteristicsRequest {
    searchParams: SearchPetsByCharacteristicParams
}

interface SearchPetsByCharacteristicsResponse {
    pets: PetsStoredData[]
}

export class SearchPetsByCharacteristicsUseCase {
    constructor(private repository: PetsRepository) { }

    async execute({
        searchParams
    }: SearchPetsByCharacteristicsRequest): Promise<SearchPetsByCharacteristicsResponse> {
        const matchedPets = await this.repository.findManyByCharacteristics(searchParams);

        return {
            pets: matchedPets
        }
    }
}