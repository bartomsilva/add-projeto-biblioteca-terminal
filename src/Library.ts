const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');

import { Book } from "./Book";

export class Library {

  private static books: Book[] = Book.getAllBooks()
  private static booksRented: Book[] = []

  private constructor() { }

  static rentBook(userId: string, bookId: string): void {
    // verificar se existe o usuário e o id, e se a quantidade de livros está livre
    // atualizar quantidade de livros disponiveis 
    // atualizar registro de livros alugados
    console.log("alugado")
  }

  static returnBook(userId: string, bookId: string): void {
    // verificar se existe o usuário e o id e os dois estão ligados
    // atualizar quantidade de livros disponiveis 
    // atualizar registro de livros alugados
    console.log("devolvido")
  }

  static getAviableBooks(): Book[] {
    const allBooks: Book[] = Book.getAllBooks()
    return allBooks.filter((book) => book.quantity - book.rented > 0)
  }

  static getRentedBooks(): Book[] {
    const allBooks: Book[] = Book.getAllBooks()
    return allBooks.filter((book) => book.rented > 0)
  }

}