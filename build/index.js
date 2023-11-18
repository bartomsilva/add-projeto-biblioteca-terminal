"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt = require("prompt-sync")();
const Author_1 = require("./Author");
function menu() {
    console.clear();
    console.log(`  
    ©----------------------------------©
    |   GERENCIADOR DE BIBLIOTECA      | 
    |                                  | 
    |  1) Cadastrar Autor              |
    |  2) Editar dados do Autor        |
    |  3) Excluir Autor                |
    | -------------------------------- |
    |  4) Cadastrar Usuário            |
    |  5) Editar dados do Usuário      |
    |  6) Excluir Usuário              |
    |  7) Alugar Livro                 |
    |  8) Devolver livro               |
    | -------------------------------- |
    |  9) Cadastar livro               |
    | 10) Alterar dados do livro       |
    | 11) Excluir livro                |
    | -------------------------------- |
    | 12) Lista de todos livros        |
    | 13) Lista de livros disponíveis  |
    | 14) Lista de Livros emprestados  |
    | 15) Lista de Livros por autor    |
    | 16) Lista de Livros por nome     |
    | 17) Lista de Livros por gênero   |
    |                                  |
    `);
}
let option = Infinity;
while (option != 0) {
    menu();
    option = prompt("--> Escolha uma operação: ");
    switch (+option) {
        case 0:
            break;
        case 1:
            cadastrarAutor();
            break;
        case 2:
            cadastrarAutor();
            break;
        default:
            console.log("Opção inválida.");
    }
    if (option == 0) {
        break;
    }
}
function cadastrarAutor() {
    while (true) {
        console.clear();
        console.log("======================");
        console.log("   Cadastrar Autor    ");
        console.log("======================\n");
        const name = prompt("Nome do autor = ");
        const dateBirth = prompt("Data de nascimento - dd/mm/aaaa = ");
        const nationality = prompt("Nacionalidade = ");
        const reload = prompt("digite S = salvar  outra tecla = refazer  F = finalizar: ");
        switch (reload.toUpperCase()) {
            case "S":
                if (!Author_1.Author.addAuthor(new Author_1.Author("A-" + newId(), name, dateBirth, nationality))) {
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
    menu();
}
function newId(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
