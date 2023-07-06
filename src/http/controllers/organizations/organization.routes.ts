import { FastifyInstance } from "fastify";

import { registerOrganization } from "./register-organization.controller";
import { authenticateOrganization } from "./authenticate-organization.controller";
import { refreshOrganizationToken } from "./refresth-organization-token.controller";

export async function organizationRoutes(app: FastifyInstance) {
    app.post('', registerOrganization);
    app.post('/session', authenticateOrganization);

    app.patch('/session/refresh', refreshOrganizationToken);
}