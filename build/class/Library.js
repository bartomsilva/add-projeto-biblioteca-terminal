"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');
const errors_1 = require("../error/errors");
const Book_1 = require("./Book");
const Usesr_1 = require("./Usesr");
class Library {
    constructor() { }
    static rentBook(userId, bookId) {
        try {
            if (!Usesr_1.User.getUserById(userId)) {
                throw new errors_1.NotFound(`Não encontrei o usuário com ID: ${userId}`);
            }
            const bookSelect = Book_1.Book.getBookById(bookId);
            if (!bookSelect) {
                throw new errors_1.NotFound(`Nõo encontrei o livro com ID: ${bookId}`);
            }
            if (bookSelect.rented) {
                throw new errors_1.NotFound(`Livro não disponível: ${bookSelect.title}`);
            }
            const dateRent = new Date();
            const newRentBook = {
                userId,
                bookId,
                dateRent: dateRent,
                dateReturn: new Date(dateRent.setDate(dateRent.getDate() + 3))
            };
            Library.rents.push(newRentBook);
            Library.saveRents();
            bookSelect.rented = true;
            Book_1.Book.saveStoredBooks();
            return true;
        }
        catch (error) {
            if (error instanceof errors_1.NotFound) {
                console.log("Ocorreu um erro:", error.message);
            }
            else {
                console.log("Erro inesperado:", error);
            }
        }
    }
    static returnBook(userId, bookId) {
        try {
            if (!Usesr_1.User.getUserById(userId)) {
                throw new errors_1.NotFound(`Nõo encontrei o usuário com ID: ${userId}`);
            }
            const bookSelect = Book_1.Book.getBookById(bookId);
            if (!bookSelect) {
                throw new errors_1.NotFound(`Nõo encontrei o livro com ID: ${bookId}`);
            }
            const rentSelect = Library.rents.find(rent => rent.userId == userId && rent.bookId == bookId);
            if (!rentSelect) {
                throw new errors_1.NotFound(`Nõo encontrei registro deste aluguel: ${userId} e ${bookId}`);
            }
            if (rentSelect.returned) {
                throw new errors_1.BadRequest(`Já foi dado baixa deste aluguel: ${userId} e ${bookId}`);
            }
            rentSelect.returned = new Date();
            Book_1.Book.saveStoredBooks();
            Library.saveRents();
        }
        catch (error) {
            if (error instanceof errors_1.NotFound) {
                console.log("Ocorreu um erro:", error.message);
            }
            else if (error instanceof errors_1.BadRequest) {
                console.log("Ocorreu um erro:", error.message);
            }
            else {
                console.log("Erro inesperado:", error);
            }
        }
    }
    static getAviableBooks() {
        const allBooks = Book_1.Book.getAllBooks();
        return allBooks.filter((book) => !book.rented);
    }
    static getRentedBooks() {
        const allBooks = Book_1.Book.getAllBooks();
        return allBooks.filter((book) => book.rented);
    }
    static saveRents() {
        localStorage.setItem("rents", JSON.stringify(Library.rents));
    }
    static getAllRents(userId) {
        const rents = localStorage.getItem("rents");
        if (userId) {
            return JSON.parse(rents) || [];
        }
        else {
            Library.rents = JSON.parse(rents) || [];
            return Library.rents;
        }
    }
    static getRent(userId, bookId) {
        return Library.rents.filter(rent => rent.userId == userId && rent.bookId == bookId);
    }
}
exports.Library = Library;
Library.books = Book_1.Book.getAllBooks();
Library.rents = Library.getAllRents();
