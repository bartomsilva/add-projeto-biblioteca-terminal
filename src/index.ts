const prompt = require("prompt-sync")();
import { Author } from "./class/Author";
import { User } from "./class/Usesr";
import { Book } from "./class/Book";
import { Library } from "./class/Library";
import { genders } from "./database/gender.db";

function menu() {
  console.clear();
  console.log(`  
    ┌----------------------------------┐
    |       BIBLIOTECA ESCOLAR         |  
    |                                  | 
    |  1) Cadastrar Autor              |
    |  2) Altear dados do Autor        |
    |  3) Excluir Autor                |
    ├----------------------------------┤
    |  4) Cadastrar Usuário            |
    |  5) Alterar dados do Usuário     |
    |  6) Excluir Usuário              |
    |  7) Alugar Livro                 |
    |  8) Devolver livro               |
    ├----------------------------------┤
    |  9) Cadastar livro               |
    | 10) Alterar dados do livro       |
    | 11) Excluir livro                |
    ├----------------------------------┤
    | 12) Lista de todos livros        |
    | 13) Lista de livros disponíveis  |
    | 14) Lista de Livros emprestados  |
    | 15) Lista de Livros por autor    |
    | 16) Lista de Livros por nome     |
    | 17) Lista de Livros por gênero   |
    └----------------------------------┘
    `);
}

let option: any = Infinity
while (option != 0) {
  menu();
  option = prompt("--> Escolha uma operação: ");

  switch (+option) {
    case 0:
      break
    case 1:
      cadastrarAutor()
      break
    case 2:
      editarAutor()
      break
    case 3:
      excluirAutor()
      break
    case 4:
      cadastrarUsuario()
      break
    case 5:
      editarUsuario()
      break
    case 6:
      excluirUsuario()
      break
    case 7:
      alugarLivro()
      break

    case 9:
      cadastrarLivro()
      break
    case 10:
      editarLivro()
      break
    case 11:
      excluirLivro()
      break
    case 12:
      listAllBooks()
      break
    case 13:
      listAviableBooks()
      break
    case 14:
      listRentedBooks()
      break
    case 15:
      listBooksByAuthor()
      break
    case 16:
      listBooksByName()
      break
    case 17:
      listBooksByGender()
      break
    default:
      console.log("Opção inválida.");
  }

  if (option == 0) {
    break;
  }
}

function cadastrarAutor() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("   Cadastrar Autor    ")
    console.log("======================\n")
    const name = prompt("Nome do autor = ")
    if (!name) return
    const dateBirth = prompt("Data de nascimento - dd/mm/aaaa = ")
    const nationality = prompt("Nacionalidade = ")
    const reload: string = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ")

    switch (reload.toUpperCase()) {
      case "S":
        if (!Author.addAuthor(new Author("A-" + newId(), name, dateBirth, nationality))) {
          prompt("Algo deu errado tecle ENTER para continuar...")
        }
        break
      case "":
        break
      default:
        break
    }
    if (reload == "") {
      break
    }
  }
  menu()
}

function editarAutor() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("    Editar Autor      ")
    console.log("======================\n")
    console.log("Lista de Autores\n")

    const listAuthors = Author.getAllAuthors()
    if (listAuthors) {
      listAuthors.forEach((author, i) => {
        console.log(i, "-", author.name)
      })
      const indexAuthor = prompt("Digite o número do Autor desejado ou ENTER p/sair: ")

      if (!indexAuthor) {
        return
      }
      if (indexAuthor < 0 || indexAuthor > listAuthors.length - 1) {
        prompt("escolha inválida tecle ENTER!")
        continue
      }

      const editAuthor: Author = listAuthors[indexAuthor]
      let newName = editAuthor.name
      let newDateBirth = editAuthor.dateBrith
      let newNationality = editAuthor.nationality

      console.warn("tecle ENTER para manter o valor padrão!")
      newName = prompt(`Nome - ${newName} : `) || newName
      newDateBirth = prompt(`Data de nascimento - ${newDateBirth} : `) || newDateBirth
      newNationality = prompt(`Nacionalidade - ${newNationality} : `) || newNationality

      const reload: string = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ")

      const newAuthor = new Author(
        editAuthor.id,
        newName,
        newDateBirth,
        newNationality)

      switch (reload.toUpperCase()) {
        case "S":
          if (!Author.editAuthor(editAuthor.id, newAuthor)) {
            prompt("Algo deu errado tecle ENTER para continuar...")
          }
          break
        case "R":
          continue
        case "F":
          break
        default:
          break
      }
      if (reload.toUpperCase() == "F") {
        break
      }
    }
  }
  prompt("tecle ENTER para continuar...")
  menu()
}

function excluirAutor() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("   Excluir Autor    ")
    console.log("======================\n")
    console.log("Lista de Autores\n")

    const listAuthors = Author.getAllAuthors()
    if (listAuthors) {
      listAuthors.forEach((author, i) => {
        console.log(i, "-", author.name)
      })
      const indexAuthor = prompt("Digite o número do Autor desejado ou ENTER p/sair: ")
      if (!indexAuthor) {
        return
      }
      if (indexAuthor < 0 || indexAuthor > listAuthors.length - 1) {
        prompt("escolha inválida tecle ENTER!")
        continue
      }
      const deleteAuthor: Author = listAuthors[indexAuthor]

      const reload: string = prompt("digite S = confirmar  outra tecla = refazer  F = finalizar: ")

      switch (reload.toUpperCase()) {
        case "S":
          if (!Author.deleteAuthor(deleteAuthor.id)) {
            prompt("Algo deu errado tecle ENTER para continuar...")
          }
          break
        case "R":
          continue
        case "F":
          break
        default:
          break
      }
      if (reload.toUpperCase() == "F") {
        break
      }
    }
  }
  prompt("tecle ENTER para continuar...")
  menu()
}

function cadastrarUsuario() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("  Cadastrar Usuário   ")
    console.log("======================\n")
    const name = prompt("Nome do usuário = ")
    if (!name) return
    const reload: string = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ")
    switch (reload.toUpperCase()) {
      case "S":
        // if (!User.addUser(new User("U-" + newId(), name))) {
        if (!new User("U-" + newId(), name)) {
          prompt("Algo deu errado tecle ENTER para continuar...")
        }
        break
      case "":
        break
      default:
        break
    }
    if (reload == "") {
      break
    }
  }
  menu()
}

function editarUsuario() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("    Editar Usuário    ")
    console.log("======================\n")
    console.log("Lista de Usuários\n")

    const listUsers = User.getAllUsers()
    if (listUsers) {
      listUsers.forEach((user, i) => {
        console.log(i, "-", user.name)
      })
      const indexUser = prompt("Digite o número do Usuário desejado ou ENTER p/sair: ")

      if (!indexUser) {
        return
      }
      if (indexUser < 0 || indexUser > listUsers.length - 1) {
        prompt("escolha inválida tecle ENTER!")
        continue
      }

      const editUser: User = listUsers[indexUser]
      let newName = editUser.name

      console.warn("tecle ENTER para manter o valor padrão!")
      newName = prompt(`Nome - ${newName} : `) || newName

      const reload: string = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ")
      const newUser = new User(
        editUser.id,
        newName
      )

      switch (reload.toUpperCase()) {
        case "S":
          if (!User.editUser(editUser.id, newUser)) {
            prompt("Algo deu errado tecle ENTER para continuar...")
          }
          break
        case "R":
          continue
        case "F":
          break
        default:
          break
      }
      if (reload.toUpperCase() == "F") {
        break
      }
    }
  }
  prompt("tecle ENTER para continuar...")
  menu()
}

function excluirUsuario() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("   Excluir Usuário    ")
    console.log("======================\n")
    console.log("Lista de usuários\n")

    const listUsers = User.getAllUsers()
    if (listUsers) {
      listUsers.forEach((user, i) => {
        console.log(i, "-", user.name)
      })
      const indexUser = prompt("Digite o número do Usuário desejado ou ENTER p/sair: ")
      if (!indexUser) {
        return
      }
      if (indexUser < 0 || indexUser > listUsers.length - 1) {
        prompt("escolha inválida tecle ENTER!")
        continue
      }
      const deleteUser: User = listUsers[indexUser]
      const reload: string = prompt("digite S = confirmar  outra tecla = refazer  F = finalizar: ")
      switch (reload.toUpperCase()) {
        case "S":
          if (!User.deleteUser(deleteUser.id)) {
            prompt("Algo deu errado tecle ENTER para continuar...")
          }
          break
        case "R":
          continue
        case "F":
          break
        default:
          break
      }
      if (reload.toUpperCase() == "F") {
        break
      }
    }
  }
  prompt("tecle ENTER para continuar...")
  menu()
}

function alugarLivro() {

}

function devolverLivro() {
}

function cadastrarLivro() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("   Cadastrar Livro    ")
    console.log("======================\n")

    const title = prompt("Título = ")
    if (!title) {
      return
    }
    const author = selectAuthor()
    if (!author) {
      return
    }
    console.log("Autor: ", author.name)
    const yearPublication = prompt("Ano de publicação = ")

    const gender = selectGender()
    if (!gender) {
      return
    }
    console.log("Gênero: ", gender.name)

    const reload: string = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ")
    switch (reload.toUpperCase()) {
      case "S":
        // if (!Book.addBook(new Book("B-" + newId(), title, author.id, yearPublication, gender.id))) {
        if (!new Book("B-" + newId(), title, author.id, yearPublication, gender.id)) {
          prompt("Algo deu errado tecle ENTER para continuar...")
        }
        break
      case "":
        break
      default:
        break
    }
    if (reload == "") {
      break
    }
  }
  menu()
}

function editarLivro() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("     Editar Livro     ")
    console.log("======================\n")
    console.log("Lista de livros\n")

    const listBooks: Book[] = Book.getAllBooks()
    if (listBooks) {
      listBooks.forEach((book: Book, i) => {
        console.log(i, "-", book.title)
      })
      const indexBook = prompt("Digite o número do Livro desejado ou ENTER p/sair: ")

      if (!indexBook) {
        return
      }
      if (indexBook < 0 || indexBook > listBooks.length - 1) {
        prompt("escolha inválida tecle ENTER!")
        continue
      }

      const editBook: Book = listBooks[indexBook]
      let newTitle = editBook.title
      let newAuthor = Author.getAuthorById(editBook.author) as Author

      let newGender = getGender(editBook.gender) as Gender
      let newYearPublication = editBook.yearPublication

      console.warn("tecle ENTER para manter o valor padrão!")
      newTitle = prompt(`Título - ${newTitle} : `) || newTitle
      console.log("Autor: ", newAuthor?.name)
      const author = selectAuthor()
      if (author) {
        newAuthor = author
      }
      console.log("Novo Autor: ", newAuthor?.name)
      console.log("Gênero: ", newGender?.name)
      const gender = selectGender()
      if (gender) {
        newGender = gender
      }
      console.log("Novo Gênero: ", newGender?.name)

      newYearPublication = prompt(`Ano de Publicação - ${newYearPublication} : `) || newYearPublication

      const reload: string = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ")
      const newBook = new Book(
        editBook.id,
        newTitle,
        newAuthor.id,
        newYearPublication,
        newGender.id
      )

      switch (reload.toUpperCase()) {
        case "S":
          if (!Book.editBook(editBook.id, newBook)) {
            prompt("Algo deu errado tecle ENTER para continuar...")
          }
          break
        case "R":
          continue
        case "F":
          break
        default:
          break
      }
      if (reload.toUpperCase() == "F") {
        break
      }
    }
  }
  prompt("tecle ENTER para continuar...")
  menu()
}

function excluirLivro() {
  while (true) {
    console.clear()
    console.log("======================")
    console.log("    Excluir Livro     ")
    console.log("======================\n")
    console.log("Lista de livros\n")

    const listBooks = Book.getAllBooks()
    if (listBooks) {
      listBooks.forEach((book, i) => {
        console.log(i, "-", book.title)
      })
      const indexBook = prompt("Digite o número do Livro desejado ou ENTER p/sair: ")
      if (!indexBook) {
        return
      }
      if (indexBook < 0 || indexBook > listBooks.length - 1) {
        prompt("escolha inválida tecle ENTER!")
        continue
      }
      const deleteBook: Book = listBooks[indexBook]
      const reload: string = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ")
      switch (reload.toUpperCase()) {
        case "S":
          if (!Book.deleteBook(deleteBook.id)) {
            prompt("Algo deu errado tecle ENTER para continuar...")
          }
          break
        case "R":
          continue
        case "F":
          break
        default:
          break
      }
      if (reload.toUpperCase() == "F") {
        break
      }
    }
  }
  prompt("tecle ENTER para continuar...")
  menu()
}

function selectAuthor(): Author | undefined {
  const listAuthors = Author.getAllAuthors()
  console.log("Selecione o autor:")
  if (listAuthors) {
    listAuthors.forEach((author, i) => {
      console.log(i, "-", author.name)
    })
  } else {
    console.log("lista de autores vázia!")
    return
  }
  while (true) {
    const indexAuthor = prompt("Digite o número do Autor desejado ou ENTER p/sair: ")
    if (!indexAuthor) {
      return
    }
    if (indexAuthor < 0 || indexAuthor > listAuthors.length - 1) {
      prompt("escolha inválida tecle ENTER!")
    } else {
      return listAuthors[indexAuthor]
    }
  }
}

type Gender = {
  id: string,
  name: string
}

function getGender(idGender: string): Gender | undefined {
  const gender = genders.find(gender => gender.id == idGender)
  return gender
}

function selectGender(): Gender | undefined {
  const listGenders = genders
  console.log("Selecione o gênero:")
  if (listGenders) {
    listGenders.forEach((gender, i) => {
      console.log(i, "-", gender.name)
    })
  } else {
    console.log("lista de gêneros vázia!")
    return
  }
  while (true) {
    const indexGender = prompt("Digite o número do Gênero desejado ou ENTER p/sair: ")
    if (!indexGender) {
      return
    }
    if (indexGender < 0 || indexGender > listGenders.length - 1) {
      prompt("escolha inválida tecle ENTER!")
    } else {
      return listGenders[indexGender]
    }
  }
}

// GERA ID ALEATORIO
function newId(length: number = 6): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function listAllBooks() {
  const books: Book[] = Book.getAllBooks()
  console.clear()
  console.log("\nLista completa de livros")
  console.log('------------------------')
  books
    .sort((b1: Book, b2: Book) => b1.title.localeCompare(b2.title))
    .forEach((book) => detailBook(book))
  prompt("tecle ENTER para continuar...")
}

function listAviableBooks() {
  const books: Book[] = Library.getAviableBooks()
  console.clear()
  console.log("\nLista de livros disponíveis")
  console.log('---------------------------')
  books
    .sort((b1: Book, b2: Book) => b1.title.localeCompare(b2.title))
    .forEach((book) => detailBook(book))
  prompt("tecle ENTER para continuar...")
}

function listRentedBooks() {
  const books: Book[] = Library.getRentedBooks()
  console.clear()
  console.log("\nLista de livros alugados")
  console.log('------------------------')
  books
    .sort((b1: Book, b2: Book) => b1.title.localeCompare(b2.title))
    .forEach((book) => detailBook(book))
  prompt("tecle ENTER para continuar...")
}

function listBooksByAuthor() {
  const books: Book[] = Book.getAllBooks()
  console.clear()
  console.log("\nListar de livros por autor")
  console.log('--------------------------')
  const author = selectAuthor()
  if (!author) {
    return
  }
  console.clear()
  console.log(`\nLista de livros escritos por: ${author.name}`)
  console.log("-".repeat(65))
  books
    .filter(book => book.author == author.id)
    .sort((b1: Book, b2: Book) => b1.title.localeCompare(b2.title))
    .forEach((book) => detailBook(book))
  prompt("tecle ENTER para continuar...")
}

function listBooksByGender() {
  const books: Book[] = Book.getAllBooks()
  console.clear()
  console.log("\nListar de livros por gênero")
  console.log('---------------------------')
  const gender = selectGender()
  if (!gender) {
    return
  }
  console.clear()
  console.log(`\nLista de livros do gênero: ${gender.name}`)
  console.log("-".repeat(65))
  books
    .filter(book => book.gender == gender.id)
    .sort((b1: Book, b2: Book) => b1.title.localeCompare(b2.title))
    .forEach((book) => detailBook(book))
  prompt("tecle ENTER para continuar...")
}

function listBooksByName() {
  const books: Book[] = Book.getAllBooks()
  console.clear()
  console.log("\nListar de livros por palavra")
  console.log('---------------------------')
  const title = prompt("Digite a palavra a pesquisar: ")
  if (!title) {
    return
  }
  console.clear()
  console.log(`\nLista de livros contendo a palavra: ${title}`)
  console.log("-".repeat(65))
  books
    .filter(book => book.title.toLowerCase().includes(title.toLowerCase()))
    .sort((b1: Book, b2: Book) => b1.title.localeCompare(b2.title))
    .forEach((book) => detailBook(book))
  prompt("tecle ENTER para continuar...")
}

function detailBook(book: any) {
  console.log(`Livro: ${book.title} - Ano de publicação: ${book._yearPublication}
  * id: ${book._id} 
  * Author: ${Author.getAuthorById(book.author)?.name}
  * Gênero: ${getGender(book.gender)?.name}
  * Status: ${book.rented ? "Alugado" : "Disponível"}
  
  `)
}

