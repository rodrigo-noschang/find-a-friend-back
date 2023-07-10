import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrganization } from "@/http/test-utils/create-and-auth-organization";

describe('Find Pet By Id Controller', () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be able to find a pet by id', async () => {
        const token = await createAndAuthenticateOrganization();

        await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                state: 'PR',
                age: 'Adulto',
                name: 'Fastififi',
                city: 'Maringa',
                energy_level: 3,
                independency_level: 'Baixo',
                size: 'Medio',
                type: 'Cachorro',
                about: null,
                requirements: ['Precisa de um lugar amplo']
            })

        const createdPet = await prisma.pet.findFirstOrThrow()

        const response = await request(app.server)
            .get(`/pets/${createdPet.id}`)

        expect(response.body.pet).toEqual(
            expect.objectContaining({
                name: 'Fastififi'
            })
        )

    })
})