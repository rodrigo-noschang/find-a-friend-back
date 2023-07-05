import { randomUUID } from "node:crypto";

import {
    SearchPetsByCharacteristicParams,
    PetsCreateInput,
    PetsRepository,
    PetsStoredData
} from "../pets-repository";
import { compareDogsCharacteristics } from "@/utils/compare-pets-characteristics";

export class InMemoryPetsRepository implements PetsRepository {
    public items: PetsStoredData[] = [];

    async findManyByCityAndOrCharacteristics(
        city: string,
        searchParams: SearchPetsByCharacteristicParams
    ) {
        const sameCityPets = this.items.filter(pet => {
            return pet.city === city;
        })

        const shouldFilterByCharacteristics = Object.keys(searchParams).length > 0;

        if (shouldFilterByCharacteristics) {
            const filteredPets = compareDogsCharacteristics({
                desiredCharacteristics: searchParams,
                sameCityPets
            })

            return filteredPets;
        }

        return sameCityPets;
    }

    async findUniqueById(id: string) {
        const pet = this.items.find(pet => {
            return pet.id === id
        });

        if (!pet) return null;
        return pet;
    }

    async registerPet(data: PetsCreateInput, organizationId: string) {
        const newPet = {
            ...data,
            id: randomUUID(),
            created_at: new Date(),
            organization_id: organizationId
        }

        this.items.push(newPet);

        return newPet
    }
}