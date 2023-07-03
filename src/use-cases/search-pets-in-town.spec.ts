import { describe, it, expect, beforeEach } from "vitest";

import { SearchPetsInTownUseCase } from "./search-pets-in-town";
import { PetsCreateInput } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";

let repository: InMemoryPetsRepository;
let sut: SearchPetsInTownUseCase

describe('Search Pets In Town Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new SearchPetsInTownUseCase(repository);
    })

    it('should be able to find pets in same town', async () => {
        const newPet1: PetsCreateInput = {
            name: 'Pet 1',
            age: 'Adulto',
            city: 'Cidade 01',
            energy_level: 3,
            independency_level: 'Baixa',
            size: 'Médio',
            type: 'Cachorro',
            about: null,
            requirements: ['Precisa de um lugar amplo']
        }

        const newPet2 = {
            ...newPet1,
            name: 'Pet 2'
        }

        const newPet3 = {
            ...newPet1,
            name: 'Pet 3',
            city: 'Cidade 02'
        }
        await repository.registerPet(newPet1);
        await repository.registerPet(newPet2);
        await repository.registerPet(newPet3);

        const { pets } = await sut.execute({ city: 'Cidade 01' });

        expect(pets).toHaveLength(2);
        expect(pets).not.toEqual([
            expect.objectContaining({
                name: 'Cidade 03'
            })
        ])
    })
})