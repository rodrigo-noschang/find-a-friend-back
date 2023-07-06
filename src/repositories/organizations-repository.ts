import { Organization, Prisma } from "@prisma/client";

export interface OrganizationsRepository {
    registerOrganization(organizationData: Prisma.OrganizationCreateInput): Promise<Organization>;

    findUniqueByEmail(email: string): Promise<Organization | null>;
    findUniqueByWhatsAppNumber(whatsAppNumber: string): Promise<Organization | null>;
}