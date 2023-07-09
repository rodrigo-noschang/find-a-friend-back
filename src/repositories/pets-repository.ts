import { Prisma, Pet } from "@prisma/client"

export interface SearchPetsByCharacteristicParams {
    energy_level?: number,
    type?: 'Cachorro' | 'Gato',
    age?: 'Filhote' | 'Adulto',
    size?: 'Pequeno' | 'Medio' | 'Grande',
    independency_level?: 'Baixo' | 'Medio' | 'Alto'
}

export interface PetsRepository {
    registerPet(data: Prisma.PetUncheckedCreateInput): Promise<Pet>,

    findUniqueById(id: string): Promise<Pet | null>,
    findManyByCityAndOrCharacteristics(city: string, page: number, state: string, searchParams: SearchPetsByCharacteristicParams): Promise<Pet[]>
}