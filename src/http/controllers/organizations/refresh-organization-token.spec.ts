import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from 'supertest';

import { app } from "@/app";

describe('Refresh Organization Token Controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get refresh token', async () => {
        await request(app.server)
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

        const authResponse = await request(app.server)
            .post('/organizations/session')
            .send({
                email: 'first-org@mail.com',
                password: '123456'
            })

        const response = await request(app.server)
            .patch('/organizations/session/refresh')
            .set('Cookie', authResponse.get('Set-Cookie'))
            .send();

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