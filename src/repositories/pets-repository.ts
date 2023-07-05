export interface PetsCreateInput {
    name: string,
    about?: string | null,
    type: 'Cachorro' | 'Gato',
    age: 'Filhote' | 'Adulto',
    size: 'Pequeno' | 'Médio' | 'Grande',
    energy_level: number,
    requirements?: string[],
    independency_level: 'Baixa' | 'Média' | 'Alta',

    city: string
    state: string
}

export interface PetsStoredData extends PetsCreateInput {
    id: string,
    created_at: Date
    organization_id: string
}

export interface SearchPetsByCharacteristicParams {
    energy_level?: number,
    type?: 'Cachorro' | 'Gato',
    age?: 'Filhote' | 'Adulto',
    size?: 'Pequeno' | 'Médio' | 'Grande',
    independency_level?: 'Baixa' | 'Média' | 'Alta'
}

export interface PetsRepository {
    registerPet(data: PetsCreateInput, organizationId: string): Promise<PetsStoredData>,

    findUniqueById(id: string): Promise<PetsStoredData | null>,
    findManyByCityAndOrCharacteristics(city: string, state: string, searchParams: SearchPetsByCharacteristicParams): Promise<PetsStoredData[]>
}