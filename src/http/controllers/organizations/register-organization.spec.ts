import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from 'supertest';

import { app } from "@/app";

describe('Register Organization Controller', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register an organization', async () => {
        const response = await request(app.server)
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

        expect(response.statusCode).toEqual(201);
    })
})