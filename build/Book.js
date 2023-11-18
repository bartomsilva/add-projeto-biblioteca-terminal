"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localstorage');
const errors_1 = require("./error/errors");
class Book {
    constructor(_id, _title, _author, _yearPublication, _gender, _quantity, _rented = 0) {
        this._id = _id;
        this._title = _title;
        this._author = _author;
        this._yearPublication = _yearPublication;
        this._gender = _gender;
        this._quantity = _quantity;
        this._rented = _rented;
    }
    static addBook(newBook) {
        Book.getStoredBooks();
        try {
            if (Book.getBookById(newBook.id)) {
                throw new errors_1.AlreadyRegistered(`Id (${newBook.id}) já cadastrado!`);
            }
            if (newBook._quantity <= 0) {
                throw new errors_1.DataInvalid(`quantidade (${newBook.quantity}) inválida.`);
            }
            Book.books.push(newBook);
            Book.saveStoredBooks();
            return newBook;
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
        var _a, _b, _c, _d, _e, _f;
        try {
            Book.getStoredBooks();
            const indexBook = Book.getBookById(idEdit);
            if (indexBook) {
                const bookEdit = indexBook;
                if (newBook.quantity <= 0 || newBook.quantity < bookEdit.quantity) {
                    throw new errors_1.DataInvalid(`quantidade ${newBook.quantity} inválida.`);
                }
                bookEdit.title = (_a = newBook.title) !== null && _a !== void 0 ? _a : bookEdit.title;
                bookEdit.author = (_b = newBook.author) !== null && _b !== void 0 ? _b : bookEdit.author;
                bookEdit.gender = (_c = newBook.gender) !== null && _c !== void 0 ? _c : bookEdit.gender;
                bookEdit.yearPublication = (_d = newBook.yearPublication) !== null && _d !== void 0 ? _d : bookEdit.yearPublication;
                bookEdit.quantity = (_e = newBook.quantity) !== null && _e !== void 0 ? _e : bookEdit.quantity;
                bookEdit.rented = (_f = newBook.rented) !== null && _f !== void 0 ? _f : bookEdit.rented;
                Book.saveStoredBooks();
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
            Book.getStoredBooks();
            const indexBook = Book.books.findIndex((book) => book.id === idEdit);
            if (indexBook !== -1) {
                Book.books.splice(indexBook, 1);
                localStorage.setItem("books", JSON.stringify(Book.books));
            }
            else {
                throw new errors_1.NotFound("id não encontrado");
            }
            Book.saveStoredBooks();
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
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get yearPublication() {
        return this._yearPublication;
    }
    get gender() {
        return this._gender;
    }
    get quantity() {
        return this._quantity;
    }
    get rented() {
        return this._rented || 0;
    }
    set title(newTitle) {
        this._title = newTitle;
    }
    set author(newAuthor) {
        this._author = newAuthor;
    }
    set yearPublication(newYearPublication) {
        this._yearPublication = newYearPublication;
    }
    set gender(newGender) {
        this._gender = newGender;
    }
    set quantity(newQuantity) {
        this._quantity = newQuantity;
    }
    set rented(newRented) {
        this._rented = newRented;
    }
    static getStoredBooks() {
        const storedBooks = localStorage.getItem("books");
        if (storedBooks) {
            const newsBooks = JSON.parse(storedBooks);
            Book.books = newsBooks.map((book) => {
                const newBook = new Book(book._id, book._title, book._author, book._yearPublication, book._gender, book._quantity, book._rented);
                return newBook;
            });
        }
    }
    static saveStoredBooks() {
        localStorage.setItem("books", JSON.stringify(Book.books));
    }
}
exports.Book = Book;
Book.books = [];
