import { PrismaPetsRepository } from "@/repositories/prisma-repositories/prisma-pets-repository";
import { findManyByCityAndOrCharacteristicsUseCase } from "@/use-cases/find-many-by-city-and-or-characteristics";

export function makeFindManyByCityAndOrCharacteristics() {
    const repository = new PrismaPetsRepository();
    const useCase = new findManyByCityAndOrCharacteristicsUseCase(repository);

    return useCase;
}