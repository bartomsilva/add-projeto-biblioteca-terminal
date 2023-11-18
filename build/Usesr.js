"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./localstorage');
const Library_1 = require("./Library");
const errors_1 = require("./error/errors");
class User {
    constructor(_id, _name) {
        this._id = _id;
        this._name = _name;
    }
    rentBook(userId, bookId) {
        Library_1.Library.rentBook(userId, bookId);
    }
    returnBook(userId, bookId) {
        Library_1.Library.returnBook(userId, bookId);
    }
    static addUser(newUser) {
        User.getStoredUsers();
        try {
            if (User.getUserById(newUser.id)) {
                throw new errors_1.AlreadyRegistered(`Id (${newUser.id}) já cadastrado!`);
            }
            if (User.getUserByName(newUser.name)) {
                throw new errors_1.AlreadyRegistered(`Usuário (${newUser.name} ) já cadastrado!`);
            }
            User.users.push(newUser);
            User.saveStoredUsers();
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
    static editUser(userId, newUser) {
    }
    static deltetUser(userId, newUser) {
    }
    static getUserById(userId) {
        return User.users.find(user => user.id == userId);
    }
    static getUserByName(userName) {
        return User.users.find(user => user.name == userName);
    }
    static getAllUsers() {
        return User.users;
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
            User.users = newsUsers.map((user) => {
                const newUser = new User(user._id, user._name);
                return newUser;
            });
        }
    }
    static saveStoredUsers() {
        localStorage.setItem("users", JSON.stringify(User.users));
    }
}
exports.User = User;
User.users = [];
