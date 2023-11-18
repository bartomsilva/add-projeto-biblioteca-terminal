const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');

import { NotFound } from "../error/errors";
import { Book } from "./Book";
import { User } from "./Usesr";

export class Library {

  private static books: Book[] = Book.getAllBooks()
  private static booksRented: Book[] = []

  private constructor() { }

  static rentBook(userId: string, bookId: string): void {
    // verificar se existe o usuário e o id, e se a quantidade de livros está livre
    // atualizar quantidade de livros disponiveis 
    // atualizar registro de livros alugados
    try {
      if (!User.getUserById(userId)){
        throw new NotFound(`Não encotrei o usuário com ID: ${userId}`)
      }
      const book = Book.getBookById(bookId)
      if (!book){
        throw new NotFound(`Nõo encontrei o livro com ID: ${bookId}`)
      }
      if(book.quantity-book.rented ==0){
        throw new NotFound(`Livro não disponível: ${book.title}`)
      }      
    } catch (error) {
      
    }

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