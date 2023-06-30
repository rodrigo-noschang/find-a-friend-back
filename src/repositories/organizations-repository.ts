export interface OrganizationCreateInput {
    uf: string,
    city: string,
    address: string,
    whats_app: string,
    hash_password: string,

    email?: string | null,
    zip_code?: string | null,
    responsible_name?: string | null,
}

export interface OrganizationStoredData extends OrganizationCreateInput {
    id: string,
    created_at: Date,
}

export interface OrganizationsRepository {
    registerOrganization(organizationData: OrganizationCreateInput): Promise<OrganizationStoredData>;

    findUniqueByEmail(email: string): Promise<OrganizationStoredData | null>;
    findUniqueByWhatsAppNumber(whatsAppNumber: string): Promise<OrganizationStoredData | null>;
}