"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./src/database');
const Library_1 = require("./Library");
const errors_1 = require("../error/errors");
class User {
    constructor(_id, _name) {
        this._id = _id;
        this._name = _name;
        if (!User.addUser(this))
            return;
    }
    rentBook(userId, bookId) {
        Library_1.Library.rentBook(this.id, bookId);
    }
    returnBook(userId, bookId) {
        Library_1.Library.returnBook(userId, bookId);
    }
    static addUser(newUser) {
        try {
            if (User.getUserById(newUser.id)) {
                throw new errors_1.AlreadyRegistered(`Id (${newUser.id}) já cadastrado!`);
            }
            if (User.getUserByName(newUser.name)) {
                throw new errors_1.AlreadyRegistered(`Usuário (${newUser.name} ) já cadastrado!`);
            }
            User.users.push(newUser);
            User.saveStoredUsers();
            return true;
        }
        catch (error) {
            if (error instanceof errors_1.AlreadyRegistered) {
                console.error("Erro ao cadastrar:", error.message);
            }
            else {
                console.error("Ocorreu um erro inesperado:", error);
            }
        }
    }
    static editUser(idEdit, newUser) {
        var _a;
        try {
            const userEdit = User.getUserById(idEdit);
            if (userEdit) {
                userEdit.name = (_a = newUser.name) !== null && _a !== void 0 ? _a : userEdit.name;
                User.saveStoredUsers();
                return true;
            }
            else {
                throw new errors_1.NotFound(`id (${idEdit}) não encontrado`);
            }
        }
        catch (error) {
            if (error instanceof errors_1.NotFound) {
                console.log("ocorreu um erro:", error.message);
            }
            else {
                console.log("erro não esperado:", error);
            }
        }
    }
    static deleteUser(idDelete) {
        var _a;
        try {
            const newUsers = (_a = User.getAllUsers()) === null || _a === void 0 ? void 0 : _a.filter(user => user._id != idDelete);
            User.users = newUsers || [];
            User.saveStoredUsers();
            return true;
        }
        catch (error) {
            if (error instanceof errors_1.NotFound) {
                console.log("ocorreu um erro:", error.message);
            }
            else {
                console.log("erro não esperado:", error);
            }
        }
    }
    static getUserById(userId) {
        try {
            return User.users.find(user => user.id == userId);
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
    static getUserByName(userName) {
        try {
            return User.users.find(user => user.name == userName);
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
    static getAllUsers() {
        try {
            User.getStoredUsers();
            return User.users;
        }
        catch (error) {
            console.log(`ocorreu um erro`, error);
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    static getStoredUsers() {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            const newsUsers = JSON.parse(storedUsers);
            User.users = [];
            newsUsers.forEach((user) => {
                new User(user._id, user._name);
            });
        }
    }
    static saveStoredUsers() {
        localStorage.setItem("users", JSON.stringify(User.users));
    }
}
exports.User = User;
User.users = [];
