import { PrismaClient, Prisma } from '@prisma/client';

import { OrganizationsRepository } from "../organizations-repository";
import { prisma } from '@/lib/prisma';

export class PrismaOrganizationsRepository implements OrganizationsRepository {
    async findUniqueByEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                email
            }
        })

        return organization;
    }

    async findUniqueByWhatsAppNumber(whatsAppNumber: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                whats_app: whatsAppNumber
            }
        })

        return organization;
    }

    async registerOrganization(organizationData: Prisma.OrganizationCreateInput) {
        const newOrganization = await prisma.organization.create({
            data: organizationData
        })

        return newOrganization;
    }
}