import { Prisma } from "@prisma/client";

import { PetsRepository, SearchPetsByCharacteristicParams } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
    async registerPet(data: Prisma.PetUncheckedCreateInput) {
        const newPet = await prisma.pet.create({
            data
        })

        return newPet;
    }

    async findUniqueById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id
            }
        })

        return pet;
    }

    async findManyByCityAndOrCharacteristics(city: string, page: number, state: string, searchParams: SearchPetsByCharacteristicParams) {
        const {
            age,
            energy_level,
            independency_level,
            size,
            type } = searchParams;

        const pets = await prisma.pet.findMany({
            where: {
                city,
                state,
                age,
                energy_level,
                independency_level,
                size,
                type
            },
            skip: 20 * (page - 1),
            take: 20 * page
        })

        return pets;
    }
}