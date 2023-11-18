const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');

import { Book } from "./Book";
import { AlreadyRegistered, DataInvalid, NotFound } from "../error/errors";

export class Author {
  private static authors: Author[] = []
  constructor(
    private _id: string,
    private _name: string,
    private _dateBirth: string,
    private _nationality: string
  ) { }

  static addAuthor(newAuthor: Author): boolean | undefined {
    try {
      Author.getStoredAuthors()
      if (!newAuthor.name) {
        throw new DataInvalid("Nome em branco não é permitido")
      }
      if (!newAuthor.nationality) {
        throw new DataInvalid("Nacionalidade em branco não é permitido")
      }
      if (!newAuthor.dateBrith) {
        throw new DataInvalid("Data de nascimento em branco não é permitido")
      }
      if (Author.getAuthorByName(newAuthor.name)?.length) {
        throw new AlreadyRegistered(`Author (${newAuthor.name}) já castrado!`)
      }
      Author.authors.push(newAuthor)
      Author.saveStoredAuthors()
      return true
    } catch (error) {
      if (error instanceof AlreadyRegistered) {
        console.error("Erro ao cadastrar:", error.message)
      } else if (error instanceof DataInvalid) {
        console.error("Erro ao cadastrar:", error.message)
      } else {
        console.error("Ocorreu um erro inesperado:", error)
      }
    }
  }

  static editAuthor(idEdit: string, newAuthor: Author): boolean | undefined {
    try {
      Author.getStoredAuthors()
      const authorEdit = Author.getAuthorById(idEdit)
      if (authorEdit) {
        authorEdit.name = newAuthor.name ?? authorEdit.name
        authorEdit.nationality = newAuthor.nationality ?? authorEdit.nationality
        authorEdit.dateBrith = newAuthor.dateBrith ?? authorEdit.dateBrith
        Author.saveStoredAuthors()
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
    Ao excluir um autor, também será excluído os livros 
    assim como o registro de aluguel dos livros.
  */
  static deleteAuthor(idDelete: string): boolean | undefined {
    try {
      Author.getStoredAuthors()
      const newAuthors = Author.getAllAuthors()
        ?.filter(author => author.id != idDelete)

      Book
        .getAllBooks()
        .filter(book => book.author == idDelete)
        .forEach(book => Book.deleteBook(book.id))

      Author.authors = newAuthors || []
      Author.saveStoredAuthors()
      // apagar livros e registros de aluguel- TODO
      return true
    } catch (error) {
      if (error instanceof NotFound) {
        console.log("ocorreu um erro:", error.message)
      } else {
        console.log("erro não esperado:", error)
      }
    }
  }

  get id(): string { return this._id }
  get name(): string { return this._name }
  get dateBrith(): string { return this._dateBirth }
  get nationality(): string { return this._nationality }
  set name(newName: string) { this._name = newName }
  set dateBrith(newDateBirth: string) { this._dateBirth = newDateBirth }
  set nationality(newNationality: string) { this._nationality = newNationality }

  // BUSCAR ATOUR POR ID / NAME / ALL
  static getAuthorById(id: string): Author | undefined {
    try {
      Author.getStoredAuthors()
      return Author.authors.find(author => author.id == id)
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }
  static getAuthorByName(name: string): Author[] | undefined {
    try {
      Author.getStoredAuthors()
      return Author.authors.filter(author => author.name == name)
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }
  static getAllAuthors(): Author[] | undefined {
    try {
      Author.getStoredAuthors()
      return Author.authors
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }

  // SALVAR / LER DADOS NO LOCALSTORAGE
  private static getStoredAuthors(): void {
    try {
      const storedAuthors = localStorage.getItem("authors");
      if (storedAuthors) {
        const newAuthors = JSON.parse(storedAuthors);
        Author.authors = newAuthors.map((author: Author) => {
          const newAuthor = new Author(
            author._id,
            author._name,
            author._dateBirth,
            author._nationality
          )
          return newAuthor
        })
      }
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }
  private static saveStoredAuthors(): void {
    try {
      localStorage.setItem("authors", JSON.stringify(Author.authors))
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }
}


