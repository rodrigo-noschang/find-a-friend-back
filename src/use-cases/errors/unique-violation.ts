export class UniqueViolation extends Error {
    constructor(column: string) {
        super(`Unique Violation: ${column}'s value is already registered`);
    }
}