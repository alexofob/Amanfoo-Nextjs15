export class AuthenticationError extends Error {
  constructor() {
    super("You must be authenticated to perform this action");
  }
}
