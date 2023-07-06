import { Pet, Prisma } from "@prisma/client";

import { PetsRepository } from "@/repositories/pets-repository";

interface RegisterPetUseCaseRequest {
    petData: Prisma.PetUncheckedCreateInput
}

interface RegisterUseCaseResponse {
    pet: Pet
}

export class RegisterPetUseCase {
    constructor(private repository: PetsRepository) { }

    async execute(
        { petData }: RegisterPetUseCaseRequest
    ): Promise<RegisterUseCaseResponse> {
        const newPet = await this.repository.registerPet(petData);

        return {
            pet: newPet
        }
    }
}