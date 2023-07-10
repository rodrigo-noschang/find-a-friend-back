import request from 'supertest';

import { app } from '@/app';

export async function createAndAuthenticateOrganization() {
    await request(app.server)
        .post('/organizations')
        .send({
            name: 'First Organization',
            email: 'first-org@mail.com',
            responsible_name: 'Responsible',
            zip_code: null,
            whats_app: '44999999999',
            address: 'First Organization Street',
            city: 'Maringa',
            state: 'PR',
            password: '123456',
        })

    const response = await request(app.server)
        .post('/organizations/session')
        .send({
            email: 'first-org@mail.com',
            password: '123456'
        })

    return response.body.token
}