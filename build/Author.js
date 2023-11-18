"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localstorage');
const errors_1 = require("./error/errors");
class Author {
    constructor(_id, _name, _dateBirth, _nationality) {
        this._id = _id;
        this._name = _name;
        this._dateBirth = _dateBirth;
        this._nationality = _nationality;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get dateBrith() {
        return this._dateBirth;
    }
    get nationality() {
        return this._nationality;
    }
    set name(newName) {
        this._name = newName;
    }
    set dateBrith(newDateBirth) {
        this._dateBirth = newDateBirth;
    }
    set nationality(newNationality) {
        this._nationality = newNationality;
    }
    static getStoredAuthors() {
        const storedAuthors = localStorage.getItem("authors");
        if (storedAuthors) {
            const newAuthors = JSON.parse(storedAuthors);
            Author.authors = newAuthors.map((author) => {
                const newAuthor = new Author(author._id, author._name, author._dateBirth, author._nationality);
                return newAuthor;
            });
        }
    }
    static saveStoredAthors() {
        localStorage.setItem("athors", JSON.stringify(Author.authors));
    }
    static addAuthor(newAuthor) {
        try {
            Author.getStoredAuthors();
            if (!newAuthor.name) {
                throw new errors_1.DataInvalid("Nome em branco não é permitido");
            }
            if (!newAuthor.nationality) {
                throw new errors_1.DataInvalid("Nacionalidade em branco não é permitido");
            }
            if (!newAuthor.dateBrith) {
                throw new errors_1.DataInvalid("Data de nascimento em branco não é permitido");
            }
            if (Author.authors.some(author => author.id === newAuthor.id)) {
                throw new errors_1.AlreadyRegistered("Id já cadastrado!");
            }
            if (Author.authors.some(author => author.name === newAuthor.name)) {
                throw new errors_1.AlreadyRegistered("Author já castrado!");
            }
            1;
            Author.authors.push(newAuthor);
            Author.saveStoredAthors();
            return newAuthor;
        }
        catch (error) {
            if (error instanceof errors_1.AlreadyRegistered) {
                console.error("Erro ao cadastrar:", error.message);
            }
            else if (error instanceof errors_1.DataInvalid) {
                console.error("Erro ao cadastrar:", error.message);
            }
            else {
                console.error("Ocorreu um erro inesperado:", error);
            }
        }
    }
    static findAuthoById(id) {
        try {
            Author.getStoredAuthors();
            const autor = Author.authors.find(author => author.id == id);
            return autor === null || autor === void 0 ? void 0 : autor.name;
        }
        catch (error) {
        }
    }
}
exports.Author = Author;
Author.authors = [];
