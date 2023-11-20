"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.DataInvalid = exports.NotFound = exports.AlreadyRegistered = void 0;
class AlreadyRegistered extends Error {
    constructor(message = "cadastrado em duplicidade") {
        super(message);
    }
}
exports.AlreadyRegistered = AlreadyRegistered;
class NotFound extends Error {
    constructor(message = "não encontrado") {
        super(message);
    }
}
exports.NotFound = NotFound;
class DataInvalid extends Error {
    constructor(message = "dado invalido") {
        super(message);
    }
}
exports.DataInvalid = DataInvalid;
class BadRequest extends Error {
    constructor(message = "Requisição invalida") {
        super(message);
    }
}
exports.BadRequest = BadRequest;
