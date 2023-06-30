import 'dotenv/config';
import { z } from 'zod';

const environmentVariablesSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number(),
    JWT_SECRET: z.string()
});

const { NODE_ENV, PORT, JWT_SECRET } = environmentVariablesSchema.parse(process.env);

export const env = {
    NODE_ENV,
    PORT,
    JWT_SECRET
}