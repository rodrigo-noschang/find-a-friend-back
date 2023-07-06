import { PrismaOrganizationsRepository } from "@/repositories/prisma-repositories/prisma-organizations-repository";
import { AuthenticateOrganizationUseCase } from "@/use-cases/authenticate-organization";

export function makeAuthenticateOrganizationUseCase() {
    const repository = new PrismaOrganizationsRepository();
    const useCase = new AuthenticateOrganizationUseCase(repository);

    return useCase;
}