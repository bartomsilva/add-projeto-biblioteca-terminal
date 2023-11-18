const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./src/database');

import { Author } from "./Author"
import { AlreadyRegistered, DataInvalid, NotFound } from "../error/errors"

interface IBook {
  id: string
  title: string
  author: string
  yearPublication: number
  gender: string
}

export class Book implements IBook {
  private static books: Book[] = []
  private _quantity:number
  private _rented: number
  constructor(
    private _id: string,
    private _title: string,
    private _author: string,
    private _yearPublication: number,
    private _gender: string,
  ) { 
    this._quantity = 1
    this._rented = 0
  }

  static addBook(newBook: Book): boolean | undefined {
    Book.getStoredBooks()
    try {
  
      if (!Author.getAuthorById(newBook.author)) {
        throw new NotFound(`author (${newBook.author}) não cadastrado.`)
      }
      // validar genero - TODO
      // validar data de publicação > data de nascimento - TODO
      Book.books.push(newBook)
      Book.saveStoredBooks()
      return true
    } catch (error) {
      if (error instanceof AlreadyRegistered) {
        console.error("Erro ao cadastrar:", error.message)
      } else if (error instanceof DataInvalid) {
        console.error("Erro de dados:", error.message)
      } else {
        console.error("Ocorreu um erro inesperado:", error)
      }
    }
  }

  static editBook(idEdit: string, newBook: Book ): boolean|undefined {
    try {
      Book.getStoredBooks()
      // const indexBook = Book.books.findIndex((book) => book.id === idEdit)
      const bookEdit = Book.getBookById(idEdit)
      if (bookEdit) {
        if (newBook.quantity <= 0 || newBook.quantity < bookEdit.quantity) {
          throw new DataInvalid(`quantidade ${newBook.quantity} inválida.`)
        }
        if (!Author.getAuthorById(newBook.author)) {
          throw new NotFound(`author (${newBook.author}) não cadastrado.`)
        }
        // validar genero - TODO
        // validar data de publicação > data de nascimento - TODO
        bookEdit.title = newBook.title ?? bookEdit.title
        bookEdit.author = newBook.author ?? bookEdit.author
        bookEdit.gender = newBook.gender ?? bookEdit.gender
        bookEdit.yearPublication = newBook.yearPublication ?? bookEdit.yearPublication
        bookEdit.quantity = newBook.quantity ?? bookEdit.quantity
        bookEdit.rented = newBook.rented ?? bookEdit.rented
        Book.saveStoredBooks()
        return true
      } else {
        throw new NotFound(`id (${idEdit}) não encontrado`)
      }
    } catch (error) {
      if (error instanceof NotFound) {
        console.log("ocorreu um erro:", error.message)
      } else {
        console.log("erro não esperado:", error)
      }
    }
  }

  /*
    Ao excluir um livro, também será apagado o registro 
    de aluguel.
  */
  static deleteBook(idEdit: string): boolean|undefined {
    try {
      Book.getStoredBooks()
      const indexBook = Book.books.findIndex((book) => book.id === idEdit)
      if (indexBook !== -1) {
        Book.books.splice(indexBook, 1)
        Book.saveStoredBooks()
        // deletar registro de aluguel
        return true
      } else {
        throw new NotFound("id não encontrado")
      }
    } catch (error) {
      if (error instanceof NotFound) {
        console.log("ocorreu um erro:", error.message)
      } else {
        console.log("erro não esperado:", error)
      }
    }
  }

  // BUSCA BOOK POR ID / NAME /ALL
  static getBookById(bookId: string): Book | undefined {
    return Book.books.find(book => book.id == bookId)
  }
  static getBookByname(bookTitle: string): Book | undefined {
    return Book.books.find(book => book.title == bookTitle)
  }
  static getAllBooks(): Book[] {
    Book.getStoredBooks()
    return Book.books
  }

  get id(): string { return this._id }
  get title(): string { return this._title }
  get author(): string { return this._author }
  get yearPublication(): number { return this._yearPublication }
  get gender(): string { return this._gender }
  get quantity(): number { return this._quantity }
  get rented(): number { return this._rented || 0 }
  set title(newTitle: string) { this._title = newTitle }
  set author(newAuthor: string) { this._author = newAuthor }
  set yearPublication(newYearPublication: number) { this._yearPublication = newYearPublication }
  set gender(newGender: string) { this._gender = newGender }
  set quantity(newQuantity: number) { this._quantity = newQuantity }
  set rented(newRented: number) { this._rented = newRented }

  static setBooks(newBooks: Book[]): void {
    Book.books = newBooks
    Book.saveStoredBooks()
  }

  // SALVAR / LER DADOS NO LOCALSTORAGE
  private static getStoredBooks(): void {
    const storedBooks = localStorage.getItem("books")
    if (storedBooks) {
      const newsBooks = JSON.parse(storedBooks)
      Book.books = newsBooks.map((book: Book) => {
        const newBook = new Book(
          book._id,
          book._title,
          book._author,
          book._yearPublication,
          book._gender
        )
        return newBook
      })
    }
  }
  private static saveStoredBooks(): void {
    localStorage.setItem("books", JSON.stringify(Book.books))
  }
}


