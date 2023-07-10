import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from 'supertest';

import { app } from "@/app";

describe('Authenticate Organization Controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register an organization', async () => {
        const createOrganizationResponse = await request(app.server)
            .post('/organizations')
            .send({
                name: 'First Organization',
                email: 'first-org@mail.com',
                responsible_name: 'Responsible',
                zip_code: null,
                whats_app: '44999999999',
                address: 'First Organization Street',
                city: 'City 1',
                state: 'UF',
                password: '123456',
            })

        const response = await request(app.server)
            .post('/organizations/session')
            .send({
                email: 'first-org@mail.com',
                password: '123456'
            })

        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ]);

        expect(response.body).toEqual(
            expect.objectContaining({
                token: expect.any(String)
            })
        )
    })
})