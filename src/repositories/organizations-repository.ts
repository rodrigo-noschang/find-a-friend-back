export interface RequestOrganization {
    uf: string,
    city: string,
    address: string,
    hash_password: string,
    whats_app: string,

    email?: string,
    zip_code?: string,
    responsible_name?: string,
}

export interface DatabaseOrganization {
    id: string,
    created_at: Date,

    uf: string,
    city: string,
    address: string,
    whats_app: string,

    email?: string,
    zip_code?: string,
    responsible_name?: string,
}

export interface OrganizationsRepository {
    registerOrganization(organizationData: RequestOrganization): Promise<DatabaseOrganization>;
    findUniqueByWhatsAppNumber(whatsAppNumber: string): Promise<DatabaseOrganization | null>;
}