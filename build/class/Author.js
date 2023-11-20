"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');
const Book_1 = require("./Book");
const errors_1 = require("../error/errors");
class Author {
    constructor(_id, _name, _dateBirth, _nationality) {
        this._id = _id;
        this._name = _name;
        this._dateBirth = _dateBirth;
        this._nationality = _nationality;
    }
    static addAuthor(newAuthor) {
        var _a;
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
            if ((_a = Author.getAuthorByName(newAuthor.name)) === null || _a === void 0 ? void 0 : _a.length) {
                throw new errors_1.AlreadyRegistered(`Author (${newAuthor.name}) já castrado!`);
            }
            Author.authors.push(newAuthor);
            Author.saveStoredAuthors();
            return true;
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
    static editAuthor(idEdit, newAuthor) {
        var _a, _b, _c;
        try {
            Author.getStoredAuthors();
            const authorEdit = Author.getAuthorById(idEdit);
            if (authorEdit) {
                authorEdit.name = (_a = newAuthor.name) !== null && _a !== void 0 ? _a : authorEdit.name;
                authorEdit.nationality = (_b = newAuthor.nationality) !== null && _b !== void 0 ? _b : authorEdit.nationality;
                authorEdit.dateBrith = (_c = newAuthor.dateBrith) !== null && _c !== void 0 ? _c : authorEdit.dateBrith;
                Author.saveStoredAuthors();
                return true;
            }
            else {
                throw new errors_1.NotFound(`id (${idEdit}) não encontrado`);
            }
        }
        catch (error) {
            if (error instanceof errors_1.NotFound) {
                console.log("ocorreu um erro:", error.message);
            }
            else {
                console.log("erro não esperado:", error);
            }
        }
    }
    static deleteAuthor(idDelete) {
        var _a;
        try {
            Author.getStoredAuthors();
            const newAuthors = (_a = Author.getAllAuthors()) === null || _a === void 0 ? void 0 : _a.filter(author => author.id != idDelete);
            Book_1.Book
                .getAllBooks()
                .filter(book => book.author == idDelete)
                .forEach(book => Book_1.Book.deleteBook(book.id));
            Author.authors = newAuthors || [];
            Author.saveStoredAuthors();
            return true;
        }
        catch (error) {
            if (error instanceof errors_1.NotFound) {
                console.log("ocorreu um erro:", error.message);
            }
            else {
                console.log("erro não esperado:", error);
            }
        }
    }
    get id() { return this._id; }
    get name() { return this._name; }
    get dateBrith() { return this._dateBirth; }
    get nationality() { return this._nationality; }
    set name(newName) { this._name = newName; }
    set dateBrith(newDateBirth) { this._dateBirth = newDateBirth; }
    set nationality(newNationality) { this._nationality = newNationality; }
    static getAuthorById(id) {
        try {
            Author.getStoredAuthors();
            return Author.authors.find(author => author.id == id);
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
    static getAuthorByName(name) {
        try {
            Author.getStoredAuthors();
            return Author.authors.filter(author => author.name == name);
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
    static getAllAuthors() {
        try {
            Author.getStoredAuthors();
            return Author.authors;
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
    static getStoredAuthors() {
        try {
            const storedAuthors = localStorage.getItem("authors");
            if (storedAuthors) {
                const newAuthors = JSON.parse(storedAuthors);
                Author.authors = newAuthors.map((author) => {
                    const newAuthor = new Author(author._id, author._name, author._dateBirth, author._nationality);
                    return newAuthor;
                });
            }
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
    static saveStoredAuthors() {
        try {
            localStorage.setItem("authors", JSON.stringify(Author.authors));
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
}
exports.Author = Author;
Author.authors = [];
