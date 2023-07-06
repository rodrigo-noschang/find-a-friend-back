import { describe, it, expect, beforeEach } from "vitest";
import { Prisma } from "@prisma/client";

import { FindPetByIdUseCase } from "./find-pet-by-id";
import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";

let repository: InMemoryPetsRepository;
let sut: FindPetByIdUseCase

describe('Find Pet By Id Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new FindPetByIdUseCase(repository);
    })

    it('should be able to find a pet by its id', async () => {
        const newPet: Prisma.PetUncheckedCreateInput = {
            name: 'Fastififi',
            age: 'Adulto',
            city: 'São Paulo',
            state: 'SP',
            energy_level: 3,
            independency_level: 'Baixo',
            size: 'Medio',
            type: 'Cachorro',
            about: null,
            requirements: ['Precisa de um lugar amplo'],
            organization_id: 'organization-01'
        }

        const registeredPet = await repository.registerPet(newPet);

        const { pet } = await sut.execute({ id: registeredPet.id });

        expect(pet).not.toBe(null);
        expect(pet).toHaveProperty('city');
    })

    it('should receive null when id not found', async () => {
        const { pet } = await sut.execute({ id: '123' });

        expect(pet).toEqual(null);
    })
})