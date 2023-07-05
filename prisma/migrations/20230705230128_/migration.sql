-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('Filhote', 'Adulto');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('Pequeno', 'Medio', 'Grande');

-- CreateEnum
CREATE TYPE "PetIndependencyLevel" AS ENUM ('Baixo', 'Medio', 'Alto');

-- CreateEnum
CREATE TYPE "Animal" AS ENUM ('Cachorro', 'Gato');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whats_app" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsible_name" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip_code" TEXT,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "age" "PetAge" NOT NULL,
    "size" "PetSize" NOT NULL,
    "energy" INTEGER NOT NULL,
    "requirements" TEXT[],
    "independency_level" "PetIndependencyLevel" NOT NULL,
    "animal" "Animal" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_whats_app_key" ON "organizations"("whats_app");

-- CreateIndex
CREATE INDEX "organizations_state_city_whats_app_idx" ON "organizations"("state", "city", "whats_app");

-- CreateIndex
CREATE INDEX "pets_age_size_energy_independency_level_idx" ON "pets"("age", "size", "energy", "independency_level");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
