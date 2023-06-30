import { randomUUID } from "node:crypto";

import { OrganizationsRepository, OrganizationCreateInput, OrganizationStoredData } from "../organizations-repository";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
    public items: OrganizationStoredData[] = [];

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

    async registerOrganization(data: OrganizationCreateInput) {
        const newOrganization = {
            id: randomUUID(),
            created_at: new Date(),
            ...data
        }

        this.items.push(newOrganization);

        const returnableData: any = { ...newOrganization };
        delete returnableData.hash_password;
        delete returnableData.password;


        return returnableData;
    }
}