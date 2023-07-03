import { PetsStoredData, SearchPetByCharacteristicParams } from "@/repositories/pets-repository";

interface CompareDogsCharacteristicsParams {
    desiredCharacteristics: SearchPetByCharacteristicParams,
    sameCityPets: PetsStoredData[]
}

export function compareDogsCharacteristics(
    {
        desiredCharacteristics,
        sameCityPets
    }: CompareDogsCharacteristicsParams
) {
    const filteredPets = sameCityPets.filter(pet => {
        if (desiredCharacteristics.age) {
            if (desiredCharacteristics.age !== pet.age) return false;
        }

        if (desiredCharacteristics.type) {
            if (desiredCharacteristics.type !== pet.type) return false;
        }

        if (desiredCharacteristics.size) {
            if (desiredCharacteristics.size !== pet.size) return false;
        }

        if (desiredCharacteristics.energy_level) {
            if (desiredCharacteristics.energy_level !== pet.energy_level) return false;
        }

        if (desiredCharacteristics.independency_level) {
            if (desiredCharacteristics.independency_level !== pet.independency_level) return false;
        }

        return true;
    })

    return filteredPets;
}