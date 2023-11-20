const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');

import { AlreadyRegistered, BadRequest, NotFound } from "../error/errors";
import { Book } from "./Book";
import { User } from "./Usesr";

type RentBook = {
  userId: string,
  bookId: string,
  dateRent: Date,
  dateReturn: Date,
  returned?: Date
}

export class Library {

  private static books: Book[] = Book.getAllBooks()
  private static rents: RentBook[] = Library.getAllRents()

  private constructor() { }

  static rentBook(userId: string, bookId: string): boolean | undefined {
    // atualizar registro de livros alugados
    try {
      if (!User.getUserById(userId)) {
        throw new NotFound(`Não encontrei o usuário com ID: ${userId}`)
      }
      const bookSelect = Book.getBookById(bookId)
      if (!bookSelect) {
        throw new NotFound(`Nõo encontrei o livro com ID: ${bookId}`)
      }
      if (bookSelect.rented) {
        throw new NotFound(`Livro não disponível: ${bookSelect.title}`)
      }
      const dateRent = new Date()
      const newRentBook: RentBook = {
        userId,
        bookId,
        dateRent: dateRent,
        dateReturn: new Date(dateRent.setDate(dateRent.getDate() + 3))
      }
      Library.rents.push(newRentBook)
      Library.saveRents()

      bookSelect.rented = true
      Book.saveStoredBooks()
      return true
    } catch (error) {
      if (error instanceof NotFound) {
        console.log("Ocorreu um erro:", error.message)
      } else {
        console.log("Erro inesperado:", error)
      }
    }
  }

  static returnBook(userId: string, bookId: string): void {
    try {
      if (!User.getUserById(userId)) {
        throw new NotFound(`Nõo encontrei o usuário com ID: ${userId}`)
      }
      const bookSelect = Book.getBookById(bookId)
      if (!bookSelect) {
        throw new NotFound(`Nõo encontrei o livro com ID: ${bookId}`)
      }
      const rentSelect = Library.rents.find(rent => rent.userId == userId && rent.bookId == bookId)
      if (!rentSelect) {
        throw new NotFound(`Nõo encontrei registro deste aluguel: ${userId} e ${bookId}`)
      }
      if (rentSelect.returned) {
        throw new BadRequest (`Já foi dado baixa deste aluguel: ${userId} e ${bookId}`)
      }
      rentSelect.returned = new Date()
      Book.saveStoredBooks()
      Library.saveRents()
    } catch (error) {
      if (error instanceof NotFound) {
        console.log("Ocorreu um erro:", error.message)
      } else if (error instanceof BadRequest) {
        console.log("Ocorreu um erro:", error.message)
      } else {
        console.log("Erro inesperado:", error)
      }
    }
  }

  static getAviableBooks(): Book[] {
    const allBooks = Book.getAllBooks()
    return allBooks.filter((book: any) => !book.rented)
  }

  static getRentedBooks(): Book[] {
    const allBooks: Book[] = Book.getAllBooks()
    return allBooks.filter((book) => book.rented)
  }

  static saveRents() {
    localStorage.setItem("rents", JSON.stringify(Library.rents))
  }

  static getAllRents(userId?:string): RentBook[] {
    const rents = localStorage.getItem("rents")
    if (userId) {
      return JSON.parse(rents) || []
    } else {
      Library.rents = JSON.parse(rents) || []
      return Library.rents
    }
  }
  static getRent(userId: string, bookId: string) {
    return Library.rents.filter(rent => rent.userId == userId && rent.bookId == bookId)
  }

}