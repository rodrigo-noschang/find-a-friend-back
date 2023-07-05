import { PrismaOrganizationsRepository } from "@/repositories/prisma-repositories/prisma-organizations-repository";
import { RegisterOrganizationUseCase } from "@/use-cases/register-organization";

export function makeRegisterOrganizationUseCase() {
    const repository = new PrismaOrganizationsRepository();
    const useCase = new RegisterOrganizationUseCase(repository);

    return useCase;
}