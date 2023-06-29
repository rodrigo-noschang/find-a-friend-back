import 'dotenv/config';
import { z } from 'zod';

const environmentVariablesSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number()
});

const { NODE_ENV, PORT } = environmentVariablesSchema.parse(process.env);

export const env = {
    NODE_ENV,
    PORT
}