export interface PetsCreateInput {
    name: string,
    about?: string,
    type: 'Cachorro' | 'Gato',
    age: 'Filhote' | 'Adulto',
    size: 'Pequeno' | 'Médio' | 'Grande',
    energy_level: number,
    requirements?: string[],
    independency_level: 'Baixa' | 'Média' | 'Alta',

    city: string
}

export interface PetsStoredData extends PetsCreateInput {
    id: string,
    created_at: Date
}

export interface PetsRepository {
    registerPet(data: PetsCreateInput): Promise<PetsStoredData>;
}