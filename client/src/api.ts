import axios from "axios";
import { Todo } from "./types";

const API_URL = "http://localhost:5000/api";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

export const createTodo = async (text: string): Promise<Todo> => {
  const response = await axios.post(`${API_URL}/todos`, { text });
  return response.data;
};

export const updateTodo = async (
  id: string,
  updates: Partial<Todo>,
): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/todos/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<Todo> => {
  const response = await axios.delete(`${API_URL}/todos/${id}`);
  return response.data;
};
