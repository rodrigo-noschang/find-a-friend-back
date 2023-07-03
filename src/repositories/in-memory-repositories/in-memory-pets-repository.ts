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

    async findManyByCharacteristics(searchParams: SearchPetsByCharacteristicParams) {

        const sameCityPets = await this.findManyByCity(searchParams.city);

        const matchedPets = compareDogsCharacteristics({
            desiredCharacteristics: searchParams,
            sameCityPets
        })

        return matchedPets;
    }

    async findUniqueById(id: string) {
        const pet = this.items.find(pet => {
            return pet.id === id
        });

        if (!pet) return null;
        return pet;
    }

    async findManyByCity(city: string) {
        const petsInTown = this.items.filter(pet => {
            return pet.city === city
        })

        return petsInTown;
    }

    async registerPet(data: PetsCreateInput) {
        const newPet = {
            ...data,
            id: randomUUID(),
            created_at: new Date()
        }

        this.items.push(newPet);

        return newPet
    }
}

const exe = new InMemoryPetsRepository();
exe.findManyByCharacteristics({
    age: "Adulto",
    size: "Grande",
    city: "Maringá"
})