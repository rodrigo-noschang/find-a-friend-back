import { FastifyInstance } from 'fastify';

import { registerPet } from './register-pet.controller';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { findPetById } from './find-pet-by-id..controller';
import { findManyByCityAndOrCharacteristics } from './find-many-by-city-and-or-characteristics.controller';

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', { preHandler: verifyJWT }, registerPet);

    app.get('/pets/:pet_id', { preHandler: verifyJWT }, findPetById);
    app.get('/pets', { preHandler: verifyJWT }, findManyByCityAndOrCharacteristics);
}