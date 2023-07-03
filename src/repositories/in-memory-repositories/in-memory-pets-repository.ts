import { randomUUID } from "node:crypto";
import { PetsCreateInput, PetsRepository, PetsStoredData } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
    private items: PetsStoredData[] = [];

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