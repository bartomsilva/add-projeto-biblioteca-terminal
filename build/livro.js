"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirLivro = exports.editarLivro = exports.cadastrarLivro = void 0;
const index_1 = require("./index");
const Author_1 = require("./class/Author");
const Book_1 = require("./class/Book");
const prompt = require("prompt-sync")();
function cadastrarLivro() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("   Cadastrar Livro    ");
        console.log("======================\n");
        const title = prompt("Título = ");
        if (!title) {
            return;
        }
        const author = (0, index_1.selectAuthor)();
        if (!author) {
            return;
        }
        console.log("Autor: ", author.name);
        const yearPublication = prompt("Ano de publicação = ");
        const gender = (0, index_1.selectGender)();
        if (!gender) {
            return;
        }
        console.log("Gênero: ", gender.name);
        const reload = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ");
        switch (reload.toUpperCase()) {
            case "S":
                if (!new Book_1.Book("B-" + (0, index_1.newId)(), title, author.id, yearPublication, gender.id)) {
                    prompt("Algo deu errado tecle ENTER para continuar...");
                }
                break;
            case "":
                break;
            default:
                break;
        }
        if (reload == "") {
            break;
        }
    }
    (0, index_1.menu)();
}
exports.cadastrarLivro = cadastrarLivro;
function editarLivro() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("     Editar Livro     ");
        console.log("======================\n");
        console.log("Lista de livros\n");
        const listBooks = Book_1.Book.getAllBooks();
        if (listBooks) {
            listBooks.forEach((book, i) => {
                console.log(i, "-", book.title);
            });
            const indexBook = prompt("Digite o número do Livro  ou ENTER p/sair: ");
            if (!indexBook) {
                return;
            }
            if (indexBook < 0 || indexBook > listBooks.length - 1) {
                prompt("escolha inválida tecle ENTER!");
                continue;
            }
            const editBook = listBooks[indexBook];
            let newTitle = editBook.title;
            let newAuthor = Author_1.Author.getAuthorById(editBook.author);
            let newGender = (0, index_1.getGender)(editBook.gender);
            let newYearPublication = editBook.yearPublication;
            console.warn("tecle ENTER para manter o valor padrão!");
            newTitle = prompt(`Título - ${newTitle} : `) || newTitle;
            console.log("Autor: ", newAuthor === null || newAuthor === void 0 ? void 0 : newAuthor.name);
            const author = (0, index_1.selectAuthor)();
            if (author) {
                newAuthor = author;
            }
            console.log("Novo Autor: ", newAuthor === null || newAuthor === void 0 ? void 0 : newAuthor.name);
            console.log("Gênero: ", newGender === null || newGender === void 0 ? void 0 : newGender.name);
            const gender = (0, index_1.selectGender)();
            if (gender) {
                newGender = gender;
            }
            console.log("Novo Gênero: ", newGender === null || newGender === void 0 ? void 0 : newGender.name);
            newYearPublication = prompt(`Ano de Publicação - ${newYearPublication} : `) || newYearPublication;
            const reload = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ");
            const newBook = new Book_1.Book(editBook.id, newTitle, newAuthor.id, newYearPublication, newGender.id);
            switch (reload.toUpperCase()) {
                case "S":
                    if (!Book_1.Book.editBook(editBook.id, newBook)) {
                        prompt("Algo deu errado tecle ENTER para continuar...");
                    }
                    break;
                case "R":
                    continue;
                case "F":
                    break;
                default:
                    break;
            }
            if (reload.toUpperCase() == "F") {
                break;
            }
        }
    }
    prompt("tecle ENTER para continuar...");
    (0, index_1.menu)();
}
exports.editarLivro = editarLivro;
function excluirLivro() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("    Excluir Livro     ");
        console.log("======================\n");
        console.log("Lista de livros\n");
        const listBooks = Book_1.Book.getAllBooks();
        if (listBooks) {
            listBooks.forEach((book, i) => {
                console.log(i, "-", book.title);
            });
            const indexBook = prompt("Digite o número do Livro  ou ENTER p/sair: ");
            if (!indexBook) {
                return;
            }
            if (indexBook < 0 || indexBook > listBooks.length - 1) {
                prompt("escolha inválida tecle ENTER!");
                continue;
            }
            const deleteBook = listBooks[indexBook];
            const reload = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ");
            switch (reload.toUpperCase()) {
                case "S":
                    if (!Book_1.Book.deleteBook(deleteBook.id)) {
                        prompt("Algo deu errado tecle ENTER para continuar...");
                    }
                    break;
                case "R":
                    continue;
                case "F":
                    break;
                default:
                    break;
            }
            if (reload.toUpperCase() == "F") {
                break;
            }
        }
    }
    prompt("tecle ENTER para continuar...");
    (0, index_1.menu)();
}
exports.excluirLivro = excluirLivro;
