import { fastify } from "fastify";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.get('/hello', (request, reply) => {
    return reply.send({
        message: "Hi there"
    })
})

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