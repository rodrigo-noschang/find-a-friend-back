import { hash } from 'bcrypt';

import { OrganizationsRepository, DatabaseOrganization } from '@/repositories/organizations-repository';

import { UniqueViolation } from "./errors/unique-violation";

interface RegisterOrganizationUseCaseRequest {
    uf: string,
    city: string,
    address: string,
    password: string,
    whats_app: string,

    email?: string,
    zip_code?: string,
    responsible_name?: string,
}

interface RegisterOrganizationUseCaseResponse {
    organization: DatabaseOrganization
}

export class RegisterOrganizationUseCase {
    constructor(private repository: OrganizationsRepository) { }

    async execute(newOrganizationData: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
        const { whats_app } = newOrganizationData;

        const isWhatsAppAlreadyRegistered = await this.repository.findUniqueByWhatsAppNumber(whats_app);

        if (isWhatsAppAlreadyRegistered) {
            throw new UniqueViolation('whats_app');
        }

        const hash_password = await hash(newOrganizationData.password, 6);

        const data = {
            ...newOrganizationData,
            password: undefined,
            hash_password
        }

        const organization = await this.repository.registerOrganization(data);

        return { organization };
    }
}