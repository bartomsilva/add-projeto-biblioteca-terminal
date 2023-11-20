"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');
const Author_1 = require("./Author");
const errors_1 = require("../error/errors");
class Book {
    constructor(_id, _title, _author, _yearPublication, _gender, _rented = false) {
        this._id = _id;
        this._title = _title;
        this._author = _author;
        this._yearPublication = _yearPublication;
        this._gender = _gender;
        this._rented = _rented;
        if (!Book.addBook(this))
            return;
    }
    static addBook(newBook) {
        try {
            if (!Author_1.Author.getAuthorById(newBook.author)) {
                throw new errors_1.NotFound(`author (${newBook.author}) não cadastrado.`);
            }
            Book.books.push(newBook);
            Book.saveStoredBooks();
            return true;
        }
        catch (error) {
            if (error instanceof errors_1.AlreadyRegistered) {
                console.error("Erro ao cadastrar:", error.message);
            }
            else if (error instanceof errors_1.DataInvalid) {
                console.error("Erro de dados:", error.message);
            }
            else {
                console.error("Ocorreu um erro inesperado:", error);
            }
        }
    }
    static editBook(idEdit, newBook) {
        var _a, _b, _c, _d;
        try {
            const bookEdit = Book.getBookById(idEdit);
            if (bookEdit) {
                if (!Author_1.Author.getAuthorById(newBook.author)) {
                    throw new errors_1.NotFound(`author (${newBook.author}) não cadastrado.`);
                }
                bookEdit.title = (_a = newBook.title) !== null && _a !== void 0 ? _a : bookEdit.title;
                bookEdit.author = (_b = newBook.author) !== null && _b !== void 0 ? _b : bookEdit.author;
                bookEdit.gender = (_c = newBook.gender) !== null && _c !== void 0 ? _c : bookEdit.gender;
                bookEdit.yearPublication = (_d = newBook.yearPublication) !== null && _d !== void 0 ? _d : bookEdit.yearPublication;
                Book.saveStoredBooks();
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
    static deleteBook(idEdit) {
        try {
            const indexBook = Book.books.findIndex((book) => book.id === idEdit);
            if (indexBook !== -1) {
                if (Book.books[indexBook].rented) {
                    throw new errors_1.BadRequest("Não é possível excluir um livro alugado");
                }
                Book.books.splice(indexBook, 1);
                Book.saveStoredBooks();
                return true;
            }
            else {
                throw new errors_1.NotFound("id não encontrado");
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
    static getBookById(bookId) {
        return Book.books.find(book => book.id == bookId);
    }
    static getBookByname(bookTitle) {
        return Book.books.find(book => book.title == bookTitle);
    }
    static getAllBooks() {
        Book.getStoredBooks();
        return Book.books;
    }
    get id() { return this._id; }
    get title() { return this._title; }
    get author() { return this._author; }
    get yearPublication() { return this._yearPublication; }
    get gender() { return this._gender; }
    get rented() { return this._rented || false; }
    set title(newTitle) { this._title = newTitle; }
    set author(newAuthor) { this._author = newAuthor; }
    set yearPublication(newYearPublication) { this._yearPublication = newYearPublication; }
    set gender(newGender) { this._gender = newGender; }
    set rented(newRented) { this._rented = newRented; }
    static getStoredBooks() {
        const storedBooks = localStorage.getItem("books");
        if (storedBooks) {
            const newsBooks = JSON.parse(storedBooks);
            Book.books = [];
            newsBooks.forEach((book) => {
                new Book(book._id, book._title, book._author, book._yearPublication, book._gender, book._rented);
            });
        }
    }
    static saveStoredBooks() {
        localStorage.setItem("books", JSON.stringify(Book.books));
    }
}
exports.Book = Book;
Book.books = [];
