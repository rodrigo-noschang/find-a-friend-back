import { Prisma } from "@prisma/client";
import { describe, it, expect, beforeEach } from "vitest";

import { SearchPetsByCharacteristicParams } from "@/repositories/pets-repository";
import { findManyByCityAndOrCharacteristicsUseCase } from "./find-many-by-city-and-or-characteristics";
import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";

let repository: InMemoryPetsRepository;
let sut: findManyByCityAndOrCharacteristicsUseCase

describe('Search Pets By Characteristics Use Case', () => {
    beforeEach(() => {
        repository = new InMemoryPetsRepository();
        sut = new findManyByCityAndOrCharacteristicsUseCase(repository);
    })

    it('should be able to find pets with matching characteristics', async () => {
        const newPet1: Prisma.PetUncheckedCreateInput = {
            name: 'Pet 1',
            age: 'Adulto',
            city: 'Cidade 01',
            state: 'ST',
            energy_level: 3,
            independency_level: 'Baixo',
            size: 'Medio',
            type: 'Cachorro',
            about: null,
            requirements: ['Precisa de um lugar amplo'],
            organization_id: 'organization-01'
        }

        const newPet2 = {
            ...newPet1,
            name: 'Pet 2'
        }

        const newPet3: Prisma.PetUncheckedCreateInput = {
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
            size: 'Medio'
        }

        const { pets } = await sut.execute({
            searchParams,
            city: 'Cidade 01',
            state: 'ST'
        })

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

    it('should not find matching pets in different cities', async () => {
        const newPet1: Prisma.PetUncheckedCreateInput = {
            name: 'Pet 1',
            age: 'Adulto',
            city: 'Cidade 01',
            state: 'ST',
            energy_level: 3,
            independency_level: 'Baixo',
            size: 'Medio',
            type: 'Cachorro',
            about: null,
            requirements: ['Precisa de um lugar amplo'],
            organization_id: 'organization-01'
        }

        const newPet2 = {
            ...newPet1,
            name: 'Pet 2',
            city: 'Cidade 02'
        }

        await repository.registerPet(newPet1);
        await repository.registerPet(newPet2);

        const searchParams: SearchPetsByCharacteristicParams = {
            age: 'Adulto',
            size: 'Medio'
        }

        const { pets } = await sut.execute({
            searchParams,
            city: 'Cidade 01',
            state: 'ST',
        })

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