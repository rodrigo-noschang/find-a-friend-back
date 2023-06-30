export interface OrganizationCreateInput {
    uf: string,
    city: string,
    address: string,
    whats_app: string,
    hash_password: string,

    email?: string,
    zip_code?: string,
    responsible_name?: string,
}

export interface OrganizationStoredData {
    id: string,
    created_at: Date,

    uf: string,
    city: string,
    address: string,
    whats_app: string,
    hash_password: string

    email?: string,
    zip_code?: string,
    responsible_name?: string,
}

export interface OrganizationsRepository {
    registerOrganization(organizationData: OrganizationCreateInput): Promise<OrganizationStoredData>;

    findUniqueByEmail(email: string): Promise<OrganizationStoredData | null>;
    findUniqueByWhatsAppNumber(whatsAppNumber: string): Promise<OrganizationStoredData | null>;
}