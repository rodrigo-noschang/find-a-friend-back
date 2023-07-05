import { PetsRepository, PetsStoredData } from "@/repositories/pets-repository";

interface PetData {
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

interface RegsiterPetUseCaseRequest {
    petData: PetData
    organizationId: string
}

interface RegisterUseCaseResponse {
    pet: PetsStoredData
}

export class RegisterPetUseCase {
    constructor(private repository: PetsRepository) { }

    async execute(
        { petData, organizationId }: RegsiterPetUseCaseRequest
    ): Promise<RegisterUseCaseResponse> {
        const newPet = await this.repository.registerPet(petData, organizationId);

        return {
            pet: newPet
        }
    }
}