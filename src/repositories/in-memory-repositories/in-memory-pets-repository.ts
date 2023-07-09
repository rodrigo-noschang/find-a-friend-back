import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

import {
    SearchPetsByCharacteristicParams,
    PetsRepository
} from "../pets-repository";
import { compareDogsCharacteristics } from "@/utils/compare-pets-characteristics";

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = [];

    async findManyByCityAndOrCharacteristics(
        city: string,
        page: number,
        state: string,
        searchParams: SearchPetsByCharacteristicParams
    ) {
        let sameCityPets = this.items.filter(pet => {
            return pet.city === city && pet.state === state;
        })

        const shouldFilterByCharacteristics = Object.keys(searchParams).length > 0;

        if (shouldFilterByCharacteristics) {
            const filteredPets = compareDogsCharacteristics({
                desiredCharacteristics: searchParams,
                sameCityPets
            })

            sameCityPets = filteredPets;
        }

        const paginatedPets = sameCityPets.slice(20 * (page - 1), 20 * page);

        return paginatedPets;
    }

    async findUniqueById(id: string) {
        const pet = this.items.find(pet => {
            return pet.id === id
        });

        if (!pet) return null;
        return pet;
    }

    async registerPet(data: Prisma.PetUncheckedCreateInput) {
        const newPet = {
            ...data,
            id: randomUUID(),
            about: data.about ?? null,
            updated_at: new Date(),
            requirements: Array.isArray(data.requirements) ? data.requirements : [],
            created_at: new Date(),
        }

        this.items.push(newPet);

        return newPet
    }
}