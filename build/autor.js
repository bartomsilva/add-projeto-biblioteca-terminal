"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirAutor = exports.editarAutor = exports.cadastrarAutor = void 0;
const index_1 = require("./index");
const Author_1 = require("./class/Author");
const prompt = require("prompt-sync")();
function cadastrarAutor() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("   Cadastrar Autor    ");
        console.log("======================\n");
        const name = prompt("Nome do autor = ");
        if (!name)
            return;
        const dateBirth = prompt("Data de nascimento - dd/mm/aaaa = ");
        const nationality = prompt("Nacionalidade = ");
        const reload = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ");
        switch (reload.toUpperCase()) {
            case "S":
                if (!Author_1.Author.addAuthor(new Author_1.Author("A-" + (0, index_1.newId)(), name, dateBirth, nationality))) {
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
exports.cadastrarAutor = cadastrarAutor;
function editarAutor() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("    Editar Autor      ");
        console.log("======================\n");
        console.log("Lista de Autores\n");
        const listAuthors = Author_1.Author.getAllAuthors();
        if (listAuthors) {
            listAuthors.forEach((author, i) => {
                console.log(i, "-", author.name);
            });
            const indexAuthor = prompt("Digite o número do Autor ou ENTER p/sair: ");
            if (!indexAuthor) {
                return;
            }
            if (indexAuthor < 0 || indexAuthor > listAuthors.length - 1) {
                prompt("escolha inválida tecle ENTER!");
                continue;
            }
            const editAuthor = listAuthors[indexAuthor];
            let newName = editAuthor.name;
            let newDateBirth = editAuthor.dateBrith;
            let newNationality = editAuthor.nationality;
            console.warn("tecle ENTER para manter o valor padrão!");
            newName = prompt(`Nome - ${newName} : `) || newName;
            newDateBirth = prompt(`Data de nascimento - ${newDateBirth} : `) || newDateBirth;
            newNationality = prompt(`Nacionalidade - ${newNationality} : `) || newNationality;
            const reload = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ");
            const newAuthor = new Author_1.Author(editAuthor.id, newName, newDateBirth, newNationality);
            switch (reload.toUpperCase()) {
                case "S":
                    if (!Author_1.Author.editAuthor(editAuthor.id, newAuthor)) {
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
exports.editarAutor = editarAutor;
function excluirAutor() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("   Excluir Autor    ");
        console.log("======================\n");
        console.log("Lista de Autores\n");
        const listAuthors = Author_1.Author.getAllAuthors();
        if (listAuthors) {
            listAuthors.forEach((author, i) => {
                console.log(i, "-", author.name);
            });
            const indexAuthor = prompt("Digite o número do Autor  ou ENTER p/sair: ");
            if (!indexAuthor) {
                return;
            }
            if (indexAuthor < 0 || indexAuthor > listAuthors.length - 1) {
                prompt("escolha inválida tecle ENTER!");
                continue;
            }
            const deleteAuthor = listAuthors[indexAuthor];
            const reload = prompt("digite S = confirmar  outra tecla = refazer  F = finalizar: ");
            switch (reload.toUpperCase()) {
                case "S":
                    if (!Author_1.Author.deleteAuthor(deleteAuthor.id)) {
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
exports.excluirAutor = excluirAutor;
