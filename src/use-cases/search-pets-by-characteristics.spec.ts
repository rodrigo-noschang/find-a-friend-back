import { describe, it, expect, beforeEach } from "vitest";

import { SearchPetsByCharacteristicsUseCase } from "./search-pets-by-characteristics";
import { PetsCreateInput, SearchPetsByCharacteristicParams } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";

let repository: InMemoryPetsRepository;
let sut: SearchPetsByCharacteristicsUseCase

describe('Search Pets By Characteristics Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new SearchPetsByCharacteristicsUseCase(repository);
    })

    it('should be able to find pets with matching characteristics', async () => {
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

        const newPet3: PetsCreateInput = {
            ...newPet1,
            name: 'Pet 3',
            size: 'Pequeno',
            age: 'Filhote'
        }

        await repository.registerPet(newPet1);
        await repository.registerPet(newPet2);
        await repository.registerPet(newPet3);

        const searchParams: SearchPetsByCharacteristicParams = {
            age: 'Adulto',
            size: 'Médio',
            city: 'Cidade 01',
        }

        const { pets } = await sut.execute({ searchParams })

        expect(pets).toHaveLength(2);
        expect(pets).toEqual([
            expect.objectContaining({
                name: 'Pet 1',
            }),
            expect.objectContaining({
                name: 'Pet 2',
            })
        ])
    })

    it('should not find matching pets in other city', async () => {
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
            name: 'Pet 2',
            city: 'Cidade 02'
        }

        const searchParams: SearchPetsByCharacteristicParams = {
            age: 'Adulto',
            size: 'Médio',
            city: 'Cidade 01',
        }

        await repository.registerPet(newPet1);
        await repository.registerPet(newPet2);

        const { pets } = await sut.execute({ searchParams });

        expect(pets).toHaveLength(1);
        expect(pets).toEqual([
            expect.objectContaining({
                name: 'Pet 1'
            })
        ])
        expect(pets).not.toEqual([
            expect.objectContaining({
                name: 'Pet 2'
            })
        ])
    })
})