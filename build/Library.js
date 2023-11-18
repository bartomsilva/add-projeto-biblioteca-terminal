"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localstorage');
const Book_1 = require("./Book");
class Library {
    constructor() { }
    static rentBook(userId, bookId) {
        console.log("alugado");
    }
    static returnBook(userId, bookId) {
        console.log("devolvido");
    }
    static getAviableBooks() {
        const allBooks = Book_1.Book.getAllBooks();
        return allBooks.filter((book) => book.quantity - book.rented > 0);
    }
    static getRentedBooks() {
        const allBooks = Book_1.Book.getAllBooks();
        return allBooks.filter((book) => book.rented > 0);
    }
}
exports.Library = Library;
Library.books = Book_1.Book.getAllBooks();
Library.booksRented = [];
