import {
    PetsRepository,
    SearchPetsByCharacteristicParams
} from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface findManyByCityAndOrCharacteristics {
    city: string,
    state: string
    searchParams?: SearchPetsByCharacteristicParams
}

interface findManyByCityAndOrCharacteristicsResponse {
    pets: Pet[]
}

export class findManyByCityAndOrCharacteristicsUseCase {
    constructor(private repository: PetsRepository) { }

    async execute({
        city,
        state,
        searchParams = {} as SearchPetsByCharacteristicParams
    }: findManyByCityAndOrCharacteristics): Promise<findManyByCityAndOrCharacteristicsResponse> {

        const pets = await this.repository.findManyByCityAndOrCharacteristics(city, state, searchParams);

        return {
            pets
        }
    }
}