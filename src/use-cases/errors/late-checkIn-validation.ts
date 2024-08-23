export class LateCheckInValidationError extends Error {
    constructor() {
      super('CheckIn only be validated within 20 minutes of creation')
    }
  }
  