import { FastifyInstance } from "fastify";

import { registerOrganization } from "./register-organization.controller";

export async function organizationRoutes(app: FastifyInstance) {
    app.get('/organizations', registerOrganization);
}