export class AlreadyRegistered extends Error {
  constructor(message: string = "cadastrado em duplicidade") {
    super(message)
  }
}

export class NotFound extends Error {
  constructor(message: string = "não encontrado") {
    super(message)
  }
}

export class DataInvalid extends Error {
  constructor(message: string = "dado invalido") {
    super(message)
  }
}