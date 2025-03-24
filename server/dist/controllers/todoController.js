"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const Todo_1 = require("../models/Todo");
const uuid_1 = require("uuid");
const getTodos = (req, res) => {
    res.status(200).json(Todo_1.todos);
};
exports.getTodos = getTodos;
const createTodo = (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400).json({ message: "Text is required" });
        return;
    }
    const newTodo = {
        id: (0, uuid_1.v4)(),
        text,
        completed: false,
    };
    Todo_1.todos.push(newTodo);
    res.status(201).json(newTodo);
};
exports.createTodo = createTodo;
const updateTodo = (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;
    const todoIndex = Todo_1.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }
    Todo_1.todos[todoIndex] = Object.assign(Object.assign({}, Todo_1.todos[todoIndex]), { text: text || Todo_1.todos[todoIndex].text, completed: completed !== undefined ? completed : Todo_1.todos[todoIndex].completed });
    res.status(200).json(Todo_1.todos[todoIndex]);
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = Todo_1.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }
    const deletedTodo = Todo_1.todos.splice(todoIndex, 1)[0];
    res.status(200).json(deletedTodo);
};
exports.deleteTodo = deleteTodo;
