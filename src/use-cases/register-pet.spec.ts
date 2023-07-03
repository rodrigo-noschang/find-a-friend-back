import { describe, it, expect } from "vitest";

import { PetsCreateInput } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory-repositories/in-memory-pets-repository";
import { RegisterPetUseCase } from "./register-pet";

let repository: InMemoryPetsRepository;
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {


    it('should be able to register a pet', async () => {

    })
})