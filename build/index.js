"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newId = exports.selectBook = exports.selectUser = exports.selectAuthor = exports.selectGender = exports.getGender = exports.menu = void 0;
const prompt = require("prompt-sync")();
const Author_1 = require("./class/Author");
const Usesr_1 = require("./class/Usesr");
const Book_1 = require("./class/Book");
const Library_1 = require("./class/Library");
const gender_db_1 = require("./database/gender.db");
const autor_1 = require("./autor");
const usuario_1 = require("./usuario");
const livro_1 = require("./livro");
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
    | 18) Lista do Registro de Aluguel |
    └----------------------------------┘
    `);
}
exports.menu = menu;
let option = Infinity;
while (option != 0) {
    menu();
    option = prompt("--> Escolha uma operação: ");
    switch (+option) {
        case 0:
            break;
        case 1:
            (0, autor_1.cadastrarAutor)();
            break;
        case 2:
            (0, autor_1.editarAutor)();
            break;
        case 3:
            (0, autor_1.excluirAutor)();
            break;
        case 4:
            (0, usuario_1.cadastrarUsuario)();
            break;
        case 5:
            (0, usuario_1.editarUsuario)();
            break;
        case 6:
            (0, usuario_1.excluirUsuario)();
            break;
        case 7:
            (0, usuario_1.alugarLivro)();
            break;
        case 8:
            (0, usuario_1.devolverLivro)();
            break;
        case 9:
            (0, livro_1.cadastrarLivro)();
            break;
        case 10:
            (0, livro_1.editarLivro)();
            break;
        case 11:
            (0, livro_1.excluirLivro)();
            break;
        case 12:
            listAllBooks();
            break;
        case 13:
            listAviableBooks();
            break;
        case 14:
            listRentedBooks();
            break;
        case 15:
            listBooksByAuthor();
            break;
        case 16:
            listBooksByName();
            break;
        case 17:
            listBooksByGender();
            break;
        case 18:
            console.log(Library_1.Library.getAllRents);
            break;
        default:
            console.log("Opção inválida.");
    }
    if (option == 0) {
        break;
    }
}
function getGender(idGender) {
    const gender = gender_db_1.genders.find(gender => gender.id == idGender);
    return gender;
}
exports.getGender = getGender;
function selectGender() {
    const listGenders = gender_db_1.genders;
    console.log("Selecione o gênero:");
    if (listGenders) {
        listGenders.forEach((gender, i) => {
            console.log(i, "-", gender.name);
        });
    }
    else {
        console.log("lista de gêneros vázia!");
        return;
    }
    while (true) {
        const indexGender = prompt("Digite o número do Gênero  ou ENTER p/sair: ");
        if (!indexGender) {
            return;
        }
        if (indexGender < 0 || indexGender > listGenders.length - 1) {
            prompt("escolha inválida tecle ENTER!");
        }
        else {
            return listGenders[indexGender];
        }
    }
}
exports.selectGender = selectGender;
function selectAuthor() {
    const listAuthors = Author_1.Author.getAllAuthors();
    console.log("Selecione o autor:");
    if (listAuthors) {
        listAuthors.forEach((author, i) => {
            console.log(i, "-", author.name);
        });
    }
    else {
        console.log("lista de autores vázia!");
        return;
    }
    while (true) {
        const indexAuthor = prompt("Digite o número do Autor  ou ENTER p/sair: ");
        if (!indexAuthor) {
            return;
        }
        if (indexAuthor < 0 || indexAuthor > listAuthors.length - 1) {
            prompt("escolha inválida tecle ENTER!");
        }
        else {
            return listAuthors[indexAuthor];
        }
    }
}
exports.selectAuthor = selectAuthor;
function selectUser() {
    const listUsers = Usesr_1.User.getAllUsers();
    console.log("Selecione o usuário:");
    if (listUsers) {
        listUsers.forEach((user, i) => {
            console.log(i, "-", user.name);
        });
    }
    else {
        console.log("lista de usuários vázia!");
        return;
    }
    while (true) {
        const indexUser = prompt("Digite o número do Usuário  ou ENTER p/sair: ");
        if (!indexUser) {
            return;
        }
        if (indexUser < 0 || indexUser > listUsers.length - 1) {
            prompt("escolha inválida tecle ENTER!");
        }
        else {
            return listUsers[indexUser];
        }
    }
}
exports.selectUser = selectUser;
function selectBook() {
    const listBooks = Library_1.Library.getAviableBooks();
    const booksRent = [];
    console.log("Selecione o livro:");
    if (listBooks) {
        listBooks.forEach((book, i) => {
            console.log(i, "-", book.title);
        });
    }
    else {
        console.log("lista de livros vázia!");
        return;
    }
    while (true) {
        const indexBook = prompt("Digite o número do Livro ou ENTER p/sair: ");
        if (!indexBook) {
            if (booksRent.length) {
                return booksRent;
            }
            return;
        }
        if (indexBook < 0 || indexBook > listBooks.length - 1) {
            prompt("escolha inválida tecle ENTER!");
        }
        else {
            const selectBook = listBooks[indexBook];
            if (booksRent.some(book => book == selectBook)) {
                console.log(`este livro ${selectBook.title} já está na sua lista`);
            }
            else {
                console.log(`*** Livro adicionado alista: ${selectBook.title}`);
                booksRent.push(selectBook);
            }
        }
    }
}
exports.selectBook = selectBook;
function newId(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
exports.newId = newId;
function listAllBooks() {
    const books = Book_1.Book.getAllBooks();
    console.clear();
    console.log("\nLista completa de livros");
    console.log('------------------------');
    books
        .sort((b1, b2) => b1.title.localeCompare(b2.title))
        .forEach((book) => detailBook(book));
    prompt("tecle ENTER para continuar...");
}
function listAviableBooks() {
    const books = Library_1.Library.getAviableBooks();
    console.clear();
    console.log("\nLista de livros disponíveis");
    console.log('---------------------------');
    books
        .sort((b1, b2) => b1.title.localeCompare(b2.title))
        .forEach((book) => detailBook(book));
    prompt("tecle ENTER para continuar...");
}
function listRentedBooks() {
    const books = Library_1.Library.getRentedBooks();
    console.clear();
    console.log("\nLista de livros alugados");
    console.log('------------------------');
    books
        .sort((b1, b2) => b1.title.localeCompare(b2.title))
        .forEach((book) => detailBook(book));
    prompt("tecle ENTER para continuar...");
}
function listBooksByAuthor() {
    const books = Book_1.Book.getAllBooks();
    console.clear();
    console.log("\nListar de livros por autor");
    console.log('--------------------------');
    const author = selectAuthor();
    if (!author) {
        return;
    }
    console.clear();
    console.log(`\nLista de livros escritos por: ${author.name}`);
    console.log("-".repeat(65));
    books
        .filter(book => book.author == author.id)
        .sort((b1, b2) => b1.title.localeCompare(b2.title))
        .forEach((book) => detailBook(book));
    prompt("tecle ENTER para continuar...");
}
function listBooksByGender() {
    const books = Book_1.Book.getAllBooks();
    console.clear();
    console.log("\nListar de livros por gênero");
    console.log('---------------------------');
    const gender = selectGender();
    if (!gender) {
        return;
    }
    console.clear();
    console.log(`\nLista de livros do gênero: ${gender.name}`);
    console.log("-".repeat(65));
    books
        .filter(book => book.gender == gender.id)
        .sort((b1, b2) => b1.title.localeCompare(b2.title))
        .forEach((book) => detailBook(book));
    prompt("tecle ENTER para continuar...");
}
function listBooksByName() {
    const books = Book_1.Book.getAllBooks();
    console.clear();
    console.log("\nListar de livros por palavra");
    console.log('---------------------------');
    const title = prompt("Digite a palavra a pesquisar: ");
    if (!title) {
        return;
    }
    console.clear();
    console.log(`\nLista de livros contendo a palavra: ${title}`);
    console.log("-".repeat(65));
    books
        .filter(book => book.title.toLowerCase().includes(title.toLowerCase()))
        .sort((b1, b2) => b1.title.localeCompare(b2.title))
        .forEach((book) => detailBook(book));
    prompt("tecle ENTER para continuar...");
}
function detailBook(book) {
    var _a, _b;
    console.log(`Livro: ${book.title} - Ano de publicação: ${book._yearPublication}
  * id: ${book._id} 
  * Author: ${(_a = Author_1.Author.getAuthorById(book.author)) === null || _a === void 0 ? void 0 : _a.name}
  * Gênero: ${(_b = getGender(book.gender)) === null || _b === void 0 ? void 0 : _b.name}
  * Status: ${book.rented ? "Alugado" : "Disponível"}
  
  `);
}
