import { ZodError } from "zod";
import { fastify } from "fastify";
import fastifyJwt from '@fastify/jwt';

import { organizationRoutes } from "./http/controllers/organizations/organization.routes";

import { env } from "./env";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '10m'
    }
});

app.register(organizationRoutes);

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