const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');

import { NotFound } from "../error/errors";
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
  private static rents: RentBook[] = []

  private constructor() { }

  static rentBook(userId: string, bookId: string): boolean | undefined {
    // verificar se existe o usuário e o id,
    // verificar se o status do livro está livre
    // atualizar registro de livros alugados
    try {
      if (!User.getUserById(userId)) {
        throw new NotFound(`Não encontrei o usuário com ID: ${userId}`)
      }
      const book = Book.getBookById(bookId)
      if (!book) {
        throw new NotFound(`Nõo encontrei o livro com ID: ${bookId}`)
      }
      if (book.rented) {
        throw new NotFound(`Livro não disponível: ${book.title}`)
      }
      const dateRent = new Date()
      const newRentBook: RentBook = {
        userId,
        bookId,
        dateRent: dateRent,
        dateReturn: new Date(dateRent.setDate(dateRent.getDate() + 3))
      }
      Library.rents.push(newRentBook)
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
    // verificar se existe o usuário e o id e os dois estão ligados
    // atualizar quantidade de livros disponiveis 
    // atualizar registro de livros alugados
    try {

    } catch (error) {
      if (error instanceof NotFound) {
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

  static saveRent() {
    localStorage.setItem("rents", JSON.stringify(Library.rents))
  }
  static getAllRent() {
    const rents =  localStorage.getItem("rents")
    Library.rents = JSON.parse(rents)
  }
  static getRent(userId:string, bookId: string){
    return Library.rents.filter(rent => rent.userId == userId && rent.bookId == bookId)
  }

}