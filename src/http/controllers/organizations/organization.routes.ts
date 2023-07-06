import { FastifyInstance } from "fastify";

import { registerOrganization } from "./register-organization.controller";
import { authenticateOrganization } from "./authenticate-organization.controller";
import { refreshOrganizationToken } from "./refresth-organization-token.controller";

export async function organizationRoutes(app: FastifyInstance) {
    app.post('/organizations', registerOrganization);
    app.post('/organizations/session', authenticateOrganization);

    app.patch('/organizations/session/refresh', refreshOrganizationToken);
}