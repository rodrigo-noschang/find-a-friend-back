import { PrismaPetsRepository } from "@/repositories/prisma-repositories/prisma-pets-repository";
import { RegisterPetUseCase } from "@/use-cases/register-pet";

export function makeRegisterPetUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new RegisterPetUseCase(repository);

    return useCase;
}