import { Request, Response } from "express";
import { todos, ITodo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";

export const getTodos = (req: Request, res: Response): void => {
  res.status(200).json(todos);
};

export const createTodo = (req: Request, res: Response): void => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: "Text is required" });
    return;
  }

  const newTodo: ITodo = {
    id: uuidv4(),
    text,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

export const updateTodo = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    text: text || todos[todoIndex].text,
    completed: completed !== undefined ? completed : todos[todoIndex].completed,
  };

  res.status(200).json(todos[todoIndex]);
};

export const deleteTodo = (req: Request, res: Response): void => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    res.status(404).json({ message: "Todo not found" });
    return;
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  res.status(200).json(deletedTodo);
};
