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

    }

    async findManyByCityAndOrCharacteristics(city: string, state: string, searchParams: SearchPetsByCharacteristicParams) {

    }
}