import { randomUUID } from "node:crypto";
import { Prisma, Organization } from "@prisma/client";


import { OrganizationsRepository } from "../organizations-repository";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
    public items: Organization[] = [];

    async findUniqueByEmail(email: string) {
        const isEmailRegistered = this.items.find(item => {
            return item.email === email;
        })

        if (!isEmailRegistered) return null;

        return isEmailRegistered
    }

    async findUniqueByWhatsAppNumber(whatsAppNumber: string) {
        const existingWhatsAppNumber = this.items.find(organization => {
            return organization.whats_app === whatsAppNumber;
        })

        if (!existingWhatsAppNumber) return null;

        return existingWhatsAppNumber;
    }

    async registerOrganization(data: Prisma.OrganizationCreateInput) {
        const newOrganization = {
            ...data,
            id: randomUUID(),
            created_at: new Date(),
            zip_code: data.zip_code ?? null
        }

        this.items.push(newOrganization);

        const returnableData: any = { ...newOrganization };
        delete returnableData.hash_password;

        return returnableData;
    }
}