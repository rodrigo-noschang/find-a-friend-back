import { compare } from 'bcrypt';

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { OrganizationStoredData, OrganizationsRepository } from "@/repositories/organizations-repository";

interface AuthenticateOrganizationUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateOrganizationUseCaseResponse {
    organization: OrganizationStoredData;
}

export class AuthenticateOrganizationUseCase {
    constructor(private repository: OrganizationsRepository) { }

    async execute({
        email,
        password
    }: AuthenticateOrganizationUseCaseRequest
    ): Promise<AuthenticateOrganizationUseCaseResponse> {
        const organization = await this.repository.findUniqueByEmail(email);

        if (!organization) {
            throw new InvalidCredentialsError();
        }

        const doPasswordsMatch = await compare(password, organization.hash_password);

        if (!doPasswordsMatch) {
            throw new InvalidCredentialsError();
        }

        return {
            organization
        }
    }
}