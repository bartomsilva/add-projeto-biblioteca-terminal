"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolverLivro = exports.alugarLivro = exports.excluirUsuario = exports.editarUsuario = exports.cadastrarUsuario = void 0;
const Book_1 = require("./class/Book");
const Library_1 = require("./class/Library");
const Usesr_1 = require("./class/Usesr");
const index_1 = require("./index");
const prompt = require("prompt-sync")();
function cadastrarUsuario() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("  Cadastrar Usuário   ");
        console.log("======================\n");
        const name = prompt("Nome do usuário = ");
        if (!name)
            return;
        const reload = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ");
        switch (reload.toUpperCase()) {
            case "S":
                if (!new Usesr_1.User("U-" + (0, index_1.newId)(), name)) {
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
exports.cadastrarUsuario = cadastrarUsuario;
function editarUsuario() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("    Editar Usuário    ");
        console.log("======================\n");
        console.log("Lista de Usuários\n");
        const listUsers = Usesr_1.User.getAllUsers();
        if (listUsers) {
            listUsers.forEach((user, i) => {
                console.log(i, "-", user.name);
            });
            const indexUser = prompt("Digite o número do Usuário  ou ENTER p/sair: ");
            if (!indexUser) {
                return;
            }
            if (indexUser < 0 || indexUser > listUsers.length - 1) {
                prompt("escolha inválida tecle ENTER!");
                continue;
            }
            const editUser = listUsers[indexUser];
            let newName = editUser.name;
            console.warn("tecle ENTER para manter o valor padrão!");
            newName = prompt(`Nome - ${newName} : `) || newName;
            const reload = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ");
            const newUser = new Usesr_1.User(editUser.id, newName);
            switch (reload.toUpperCase()) {
                case "S":
                    if (!Usesr_1.User.editUser(editUser.id, newUser)) {
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
exports.editarUsuario = editarUsuario;
function excluirUsuario() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("   Excluir Usuário    ");
        console.log("======================\n");
        console.log("Lista de usuários\n");
        const listUsers = Usesr_1.User.getAllUsers();
        if (listUsers) {
            listUsers.forEach((user, i) => {
                console.log(i, "-", user.name);
            });
            const indexUser = prompt("Digite o número do Usuário  ou ENTER p/sair: ");
            if (!indexUser) {
                return;
            }
            if (indexUser < 0 || indexUser > listUsers.length - 1) {
                prompt("escolha inválida tecle ENTER!");
                continue;
            }
            const deleteUser = listUsers[indexUser];
            const reload = prompt("digite S = confirmar  outra tecla = refazer  F = finalizar: ");
            switch (reload.toUpperCase()) {
                case "S":
                    if (!Usesr_1.User.deleteUser(deleteUser.id)) {
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
exports.excluirUsuario = excluirUsuario;
function alugarLivro() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("  Aluguel de Livros   ");
        console.log("======================\n");
        const user = (0, index_1.selectUser)();
        if (!user)
            return;
        const listRentBooks = (0, index_1.selectBook)();
        const reload = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ");
        switch (reload.toUpperCase()) {
            case "S":
                listRentBooks === null || listRentBooks === void 0 ? void 0 : listRentBooks.forEach(book => {
                    Library_1.Library.rentBook(user.id, book.id);
                });
                console.log("\nResumo do Aluguel");
                console.log("-----------------");
                console.log('Usuário:', user.name);
                console.log('Livros alugados:');
                listRentBooks === null || listRentBooks === void 0 ? void 0 : listRentBooks.forEach(book => console.log(book.title));
                console.log("Total de livro: ", listRentBooks === null || listRentBooks === void 0 ? void 0 : listRentBooks.length);
                prompt("Obrigado e boa leitura, volte Sempre!");
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
exports.alugarLivro = alugarLivro;
function devolverLivro() {
    console.clear();
    console.log("======================");
    console.log("    Devolver Livros   ");
    console.log("======================\n");
    const user = (0, index_1.selectUser)();
    if (!user)
        return;
    const listRentBooks = Library_1.Library.getAllRents(user.id);
    if (!listRentBooks) {
        prompt("não a registro de alugueis para este usuaário, tecle ENTER");
        return;
    }
    listRentBooks.forEach((book, i) => {
        const result = Book_1.Book.getBookById(book.bookId);
        console.log(i, "-", result === null || result === void 0 ? void 0 : result.title);
    });
    const reload = prompt("digite S = salvar  outra tecla = refazer  ENTER = finalizar: ");
    switch (reload.toUpperCase()) {
        case "S":
            break;
        case "":
            break;
        default:
            break;
    }
    if (reload == "") {
        return;
    }
    (0, index_1.menu)();
}
exports.devolverLivro = devolverLivro;
