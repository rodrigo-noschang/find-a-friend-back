import { PrismaPetsRepository } from "@/repositories/prisma-repositories/prisma-pets-repository";
import { FindPetByIdUseCase } from "@/use-cases/find-pet-by-id";

export function makeFindPetByIdUseCase() {
    const repository = new PrismaPetsRepository();
    const useCase = new FindPetByIdUseCase(repository);

    return useCase;
}