import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it } from "vitest";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { AuthenticateOrganizationUseCase } from "./authenticate-organization";
import { InMemoryOrganizationsRepository } from "@/repositories/in-memory-repositories/in-memory-organizations.repository";

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateOrganizationUseCase;

async function createOrganization() {
    const hash_password = await hash('123456', 6);

    organizationsRepository.items.push({
        id: randomUUID(),
        created_at: new Date(),

        name: 'First Organization',
        email: 'first.organization@mail.com',
        responsible_name: 'Responsible',
        zip_code: null,
        whats_app: '44999999999',
        address: 'First Organization Street',
        city: 'City 1',
        state: 'UF 1',
        hash_password
    })
}

describe('Authenticate Organization Use Case', () => {
    beforeEach(async () => {
        organizationsRepository = new InMemoryOrganizationsRepository();
        sut = new AuthenticateOrganizationUseCase(organizationsRepository);

        await createOrganization();
    })

    it('should be able to authenticate an existing organization', async () => {
        const { organization } = await sut.execute({
            email: 'first.organization@mail.com',
            password: '123456'
        })

        expect(organization.id).toEqual(expect.any(String));
    })

    it('should not be able to register with wrong email', async () => {
        await expect(() => {
            return sut.execute({
                email: 'invalid.email@mail.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError);
    })

    it('should not be able to register with wrong password', async () => {
        await expect(() => {
            return sut.execute({
                email: 'first.organization@mail.com',
                password: '000000'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError);
    })
})