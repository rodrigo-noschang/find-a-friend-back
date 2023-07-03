import { describe, it, expect, beforeEach } from "vitest";

import { RegisterPetUseCase } from "./register-pet";
import { PetsCreateInput } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";

let repository: InMemoryPetsRepository;
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new RegisterPetUseCase(repository);
    })

    it('should be able to register a pet', async () => {
        const newPet: PetsCreateInput = {
            name: 'Fastififi',
            age: 'Adulto',
            city: 'São Paulo',
            energy_level: 3,
            independency_level: 'Baixa',
            size: 'Médio',
            type: 'Cachorro',
            about: null,
            requirements: ['Precisa de um lugar amplo']
        }

        const { pet } = await sut.execute(newPet);

        expect(repository.items).toHaveLength(1);
        expect(pet.id).toEqual(expect.any(String));
    })
})