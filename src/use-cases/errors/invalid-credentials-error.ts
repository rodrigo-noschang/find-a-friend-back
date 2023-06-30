export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid email ou password');
    }
}