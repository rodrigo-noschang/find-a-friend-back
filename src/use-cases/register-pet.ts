import { z } from "zod";

import { PetsRepository, PetsStoredData } from "@/repositories/pets-repository";

interface RegsiterPetUseCaseRequest {
    name: string,
    about: string,
    type: 'Cachorro' | 'Gato',
    age: 'Filhote' | 'Adulto',
    size: 'Pequeno' | 'Médio' | 'Grande',
    energy_level: number,
    requirements: string[],
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
        const newPetSchema = z.object({
            type: z.enum(['Cachorro', 'Gato']),
            age: z.enum(['Filhote', 'Adulto']),
            size: z.enum(['Pequeno', 'Médio', 'Grande']),
            energy_level: z.coerce.number().min(0).max(5),
            independency_level: z.enum(['Baixa', 'Média', 'Alta'])
        })

        const {
            type,
            age,
            size,
            energy_level,
            independency_level
        } = newPetSchema.parse(requestData);

        requestData.type = type;
        requestData.age = age;
        requestData.size = size;
        requestData.energy_level = energy_level;
        requestData.independency_level = independency_level;

        const newPet = await this.repository.registerPet(requestData);
        return {
            pet: newPet
        }
    }
}