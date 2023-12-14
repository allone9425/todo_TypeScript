import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { todoType } from "../types/todoType";
const uuid = () => {
  const tokens = v4().split("-");
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

const initialState = [
  {
    id: uuid(),
    title: "리액트 공부하기",
    contents: "리액트 공부하기",
    isDone: false,
  },
  {
    id: uuid(),
    title: "타입스크립트 공부하기",
    contents: "타입스크립트 공부하기",
    isDone: true,
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todoType>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    switchTodo: (state, action: PayloadAction<string>) => {
      const todoToSwitch = state.find((todo) => todo.id === action.payload);
      if (todoToSwitch) {
        todoToSwitch.isDone = !todoToSwitch.isDone;
      }
    },
  },
});

export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;

const todosReducer = todosSlice.reducer;

export default todosReducer;
