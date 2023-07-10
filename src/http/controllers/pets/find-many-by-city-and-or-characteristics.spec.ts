import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import request from "supertest";
import { createAndAuthenticateOrganization } from "@/http/test-utils/create-and-auth-organization";

describe('Find Many By City And Or Characteristics Controller', () => {
    beforeAll(async () => {
        await app.ready();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be able to find a pet by city and characteristics', async () => {
        const token = await createAndAuthenticateOrganization();

        await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                state: 'PR',
                age: 'Adulto',
                name: 'Fastify',
                city: 'Maringa',
                energy_level: 3,
                independency_level: 'Baixo',
                size: 'Medio',
                type: 'Cachorro',
                about: null,
                requirements: ['Precisa de um lugar amplo']
            })

        await request(app.server) // Same city, different age
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                state: 'PR',
                age: 'Filhote',
                name: 'Express',
                city: 'Maringa',
                energy_level: 3,
                independency_level: 'Baixo',
                size: 'Medio',
                type: 'Cachorro',
                about: null,
                requirements: ['Precisa de um lugar amplo']
            })

        const response = await request(app.server)
            .get('/pets')
            .query({
                'city': 'Maringa',
                'state': 'PR',
                'age': 'Adulto'
            })
            .send()

        expect(response.body.pets).toHaveLength(1);
        expect(response.body.pets).toEqual([
            expect.objectContaining({
                name: 'Fastify'
            })
        ])
    })
})