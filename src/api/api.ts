import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { todoType } from "../types/todoType";

const base_url = "http://localhost:4000/todos";

// 모든 todos를 가져오는 함수
export const fetchTodos = async () => {
  const response = await axios.get(base_url);
  return response.data;
};

// 새로운 todo를 생성하는 함수
export const createTodo = async (todo: todoType) => {
  const response = await axios.post(base_url, todo);
  return response.data;
};

// ID를 이용해서 todo를 삭제하는 함수
export const deleteTodo = async (id: string) => {
  await axios.delete(`${base_url}/${id}`);
};
// ID를 이용해서 하나의 todo를 가져오는 함수
export const fetchTodo = async (id: string) => {
  const response = await axios.get(`${base_url}/${id}`);
  return response.data;
};

// ID를 이용해 todo의 'isDone' 상태를 토글하는 함수
export const toggleTodo = async (id: string) => {
  const todo = await fetchTodo(id);
  await axios.put(`${base_url}/${id}`, { ...todo, isDone: !todo.isDone });
};

// query client에서 "todos" 쿼리를 무효화하는 커스텀 훅
export const useInvalidateTodos = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries(["todos"]); // Pass the query key as an array
  };
};
