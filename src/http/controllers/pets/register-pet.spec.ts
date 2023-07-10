import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import request from "supertest";
import { createAndAuthenticateOrganization } from "@/http/test-utils/create-and-auth-organization";

describe('Register Pet Controller', () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be able to register a new pet', async () => {
        const token = await createAndAuthenticateOrganization();

        const response = await request(app.server)
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

        expect(response.statusCode).toBe(201);
    })
})