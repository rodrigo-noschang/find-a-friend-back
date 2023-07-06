import { ZodError } from "zod";
import { fastify } from "fastify";
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from "@fastify/cookie";

import { organizationRoutes } from "./http/controllers/organizations/organization.routes";

import { env } from "./env";
import { petsRoutes } from "./http/controllers/pets/pets.routes";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false

    },
    sign: {
        expiresIn: '10m'
    }
});

app.register(organizationRoutes, {
    prefix: '/organizations'
});
app.register(petsRoutes);

app.register(fastifyCookie);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error, or missing environment variables',
            issues: error.format()
        });
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return reply.status(500).send({
        message: 'Internal server error'
    });
})