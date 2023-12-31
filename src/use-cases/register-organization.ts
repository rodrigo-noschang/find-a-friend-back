import { hash } from 'bcrypt';
import { Organization } from '@prisma/client';

import { UniqueViolation } from "./errors/unique-violation-error";

import { OrganizationsRepository } from '@/repositories/organizations-repository';

interface RegisterOrganizationUseCaseRequest {
    city: string,
    name: string
    state: string,
    address: string,
    password: string,
    whats_app: string,
    responsible_name: string,

    email: string,
    zip_code: string | null,
}

interface RegisterOrganizationUseCaseResponse {
    organization: Organization
}

export class RegisterOrganizationUseCase {
    constructor(private repository: OrganizationsRepository) { }

    async execute(newOrganizationData: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
        const { whats_app, email } = newOrganizationData;

        const isWhatsAppAlreadyRegistered = await this.repository.findUniqueByWhatsAppNumber(whats_app);

        if (isWhatsAppAlreadyRegistered) {
            throw new UniqueViolation('whats_app');
        }

        if (email) {
            const isEmailAlreadyRegistered = await this.repository.findUniqueByEmail(email);

            if (isEmailAlreadyRegistered) {
                throw new UniqueViolation('email');
            }
        }

        const hash_password = await hash(newOrganizationData.password, 6);

        const inputData: any = { ...newOrganizationData };
        delete inputData.password;

        const data = {
            ...inputData,
            hash_password
        }

        const organization = await this.repository.registerOrganization(data);

        return { organization };
    }
}