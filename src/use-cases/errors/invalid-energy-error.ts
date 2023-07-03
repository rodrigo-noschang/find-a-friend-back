export class InvalidEnergyError extends Error {
    constructor(received: any) {
        const errorMessage = `Expected Number between 0 and 5, instead received: ${received}`;
        super(errorMessage);
    }
}