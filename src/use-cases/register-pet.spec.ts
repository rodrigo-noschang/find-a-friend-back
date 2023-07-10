import { Prisma } from "@prisma/client";
import { describe, it, expect, beforeEach } from "vitest";

import { RegisterPetUseCase } from "./register-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";

let repository: InMemoryPetsRepository;
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new RegisterPetUseCase(repository);
    })

    it('should be able to register a pet', async () => {
        const newPet: Prisma.PetUncheckedCreateInput = {
            state: 'SP',
            age: 'Adulto',
            name: 'Fastififi',
            city: 'São Paulo',
            energy_level: 3,
            independency_level: 'Baixo',
            size: 'Medio',
            type: 'Cachorro',
            about: null,
            requirements: ['Precisa de um lugar amplo'],
            organization_id: 'organization-01'
        }

        const { pet } = await sut.execute({
            petData: newPet,
        });

        expect(repository.items).toHaveLength(1);
        expect(pet.id).toEqual(expect.any(String));
        expect(pet.organization_id).toEqual(expect.any(String));
    })
})