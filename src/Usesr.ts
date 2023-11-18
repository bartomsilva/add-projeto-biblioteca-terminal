const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./src/database');

import { Library } from "./Library"
import { AlreadyRegistered, NotFound } from "./error/errors"

interface IUser {
  id: string
  name: string
}

export class User implements IUser {

  static users: User[] = []

  constructor(
    private _id: string,
    private _name: string,
  ) { }

  // ALUGAR E DEVOLVER LIVRO
  rentBook(userId: string, bookId: string): void {
    Library.rentBook(userId, bookId)
  }

  returnBook(userId: string, bookId: string): void {
    Library.returnBook(userId, bookId)
  }

  // ADICIONAR USUÁRIO
  static addUser(newUser: User): boolean | undefined {
    User.getStoredUsers()
    try {
      if (User.getUserById(newUser.id)) {
        throw new AlreadyRegistered(`Id (${newUser.id}) já cadastrado!`)
      }
      if (User.getUserByName(newUser.name)) {
        throw new AlreadyRegistered(`Usuário (${newUser.name} ) já cadastrado!`)
      }
      User.users.push(newUser)
      User.saveStoredUsers()
      return true
    } catch (error) {
      if (error instanceof AlreadyRegistered) {
        console.error("Erro ao cadastrar:", error.message)
      } else {
        console.error("Ocorreu um erro inesperado:", error)
      }
    }
  }

  // EDITAR DADOS DO USUÁRIO
  static editUser(idEdit: string, newUser: User): boolean | undefined {
    try {
      User.getStoredUsers()
      const userEdit = User.getUserById(idEdit)
      if (userEdit) {
        userEdit.name = newUser.name ?? userEdit.name
        User.saveStoredUsers()
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

  // DELETAR USUÁRIO
  static deleteUser(idDelete: string): boolean | undefined {
    try {
      User.getStoredUsers()
      const newUsers = User.getAllUsers()
        ?.filter(user => user.id != idDelete)
      User.users = newUsers || []
      User.saveStoredUsers()
      // apagar livros e registros de aluguel do usuário
      return true
    } catch (error) {
      if (error instanceof NotFound) {
        console.log("ocorreu um erro:", error.message)
      } else {
        console.log("erro não esperado:", error)
      }
    }
  }

  // BUSCA USUÁRIO POR ID / NAME / ALL
  static getUserById(userId: string): User | undefined {
    try {
      User.getStoredUsers()
      return User.users.find(user => user.id == userId)
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }
  static getUserByName(userName: string): User | undefined {
    try {
      User.getStoredUsers()
      return User.users.find(user => user.name == userName)
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }
  static getAllUsers(): User[] | undefined {
    try {
      User.getStoredUsers()
      return User.users
    } catch (error) {
      console.log(`ocorreu um erro`, error)
    }
  }

  // GETTERS AND SETTERS
  get id(): string {
    return this._id
  }
  get name(): string {
    return this._name
  }

  set name(newName) {
    this._name = newName
  }

  // SALVAR / LER DADOS NO LOCALSTORAGE
  private static getStoredUsers(): void {
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      const newsUsers = JSON.parse(storedUsers)
      User.users = newsUsers.map((user: User) => {
        const newUser = new User(
          user._id,
          user._name
        )
        return newUser
      })
    }
  }
  private static saveStoredUsers(): void {
    localStorage.setItem("users", JSON.stringify(User.users))
  }


}
