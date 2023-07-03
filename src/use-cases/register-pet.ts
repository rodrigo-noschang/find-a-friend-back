import { z } from "zod";

import { PetsRepository, PetsStoredData } from "@/repositories/pets-repository";

interface RegsiterPetUseCaseRequest {
    name: string,
    about?: string | null,
    type: 'Cachorro' | 'Gato',
    age: 'Filhote' | 'Adulto',
    size: 'Pequeno' | 'Médio' | 'Grande',
    energy_level: number,
    requirements?: string[],
    independency_level: 'Baixa' | 'Média' | 'Alta',

    city: string
}

interface RegisterUseCaseResponse {
    pet: PetsStoredData
}

export class RegisterPetUseCase {
    constructor(private repository: PetsRepository) { }

    async execute(
        requestData: RegsiterPetUseCaseRequest
    ): Promise<RegisterUseCaseResponse> {
        const newPet = await this.repository.registerPet(requestData);

        return {
            pet: newPet
        }
    }
}