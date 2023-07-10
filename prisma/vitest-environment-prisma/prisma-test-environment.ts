import 'dotenv/config';
import { Environment } from "vitest";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

function generateSchemaURL(randomSchema: string) {
    const databaseURL = process.env.DATABASE_URL;
    if (!databaseURL) throw new Error('Inform a DATABASE_URL in environment variables');

    const url = new URL(databaseURL);
    url.searchParams.set('schema', randomSchema);

    return url.toString();
}

export default <Environment>{
    name: 'prisma',
    async setup() {
        const randomSchema = randomUUID();
        const databaseURL = generateSchemaURL(randomSchema);

        process.env.DATABASE_URL = databaseURL;
        execSync('npx prisma migrate deploy');

        return {
            async teardown() {
                const prisma = new PrismaClient();

                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${randomSchema}" CASCADE`
                );

                await prisma.$disconnect();
            }
        }
    }
}