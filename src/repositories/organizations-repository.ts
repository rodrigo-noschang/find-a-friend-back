import { Prisma } from "@prisma/client";

export interface OrganizationCreateInput {
    city: string,
    name: string,
    state: string,
    address: string,
    whats_app: string,
    email: string | null,
    hash_password: string,

    responsible_name: string | null,
    zip_code: string | null,
}

export interface OrganizationStoredData extends OrganizationCreateInput {
    id: string,
    created_at: Date,
}

export interface OrganizationsRepository {
    registerOrganization(organizationData: Prisma.OrganizationCreateInput): Promise<OrganizationStoredData>;

    findUniqueByEmail(email: string): Promise<OrganizationStoredData | null>;
    findUniqueByWhatsAppNumber(whatsAppNumber: string): Promise<OrganizationStoredData | null>;
}