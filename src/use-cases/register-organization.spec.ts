import { beforeEach, describe, expect, it } from 'vitest';

import { UniqueViolation } from './errors/unique-violation-error';
import { RegisterOrganizationUseCase } from './register-organization';
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory-repositories/in-memory-organizations.repository';

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterOrganizationUseCase;

describe('Register Organization Use Case', () => {
    beforeEach(() => {
        organizationsRepository = new InMemoryOrganizationsRepository();
        sut = new RegisterOrganizationUseCase(organizationsRepository);
    })

    it('should be able to register organization', async () => {
        const { organization } = await sut.execute({
            name: 'First Organization',
            email: 'first-org@mail.com',
            responsible_name: 'Responsible',
            zip_code: null,
            whats_app: '44999999999',
            address: 'First Organization Street',
            city: 'City 1',
            state: 'UF 1',
            password: '123456',
        })

        expect(organizationsRepository.items).toHaveLength(1);
        expect(organization.id).toEqual(expect.any(String));
        expect(organization).not.toHaveProperty('password');
        expect(organizationsRepository.items).toEqual([
            expect.objectContaining({
                whats_app: '44999999999'
            })
        ])
    })

    it('should not be able to register 2 organizations with the same phone number', async () => {
        await sut.execute({
            name: 'First Organization',
            email: 'first-org@mail.com',
            responsible_name: 'Responsible',
            zip_code: null,
            whats_app: '44999999999',
            address: 'First Organization Street',
            city: 'City 1',
            state: 'UF 1',
            password: '123456',
        });

        await expect(() => {
            return sut.execute({
                name: 'Second Organization',
                email: 'second-org@mail.com',
                responsible_name: 'Responsible',
                zip_code: null,
                whats_app: '44999999999',
                address: 'Second Organization Street',
                city: 'City 2',
                state: 'UF 2',
                password: '123456',
            })
        }).rejects.toBeInstanceOf(UniqueViolation);
    })

    it('should not be able to register 2 organizations with same email', async () => {
        await sut.execute({
            name: 'First Organization',
            email: 'first-org@mail.com',
            responsible_name: 'Responsible',
            zip_code: null,
            whats_app: '44999999999',
            address: 'First Organization Street',
            city: 'City 1',
            state: 'UF 1',
            password: '123456',
        });

        await expect(() => {
            return sut.execute({
                name: 'Second Organization',
                email: 'second-org@mail.com',
                responsible_name: 'Responsible',
                zip_code: null,
                whats_app: '44999999999',
                address: 'Second Organization Street',
                city: 'City 2',
                state: 'UF 2',
                password: '123456',
            })
        }).rejects.toBeInstanceOf(UniqueViolation);
    })
})