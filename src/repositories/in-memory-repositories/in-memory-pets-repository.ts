import { randomUUID } from "node:crypto";
import { PetsCreateInput, PetsRepository, PetsStoredData } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    public items: PetsStoredData[] = [];

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