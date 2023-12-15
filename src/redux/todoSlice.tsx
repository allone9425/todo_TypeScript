import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoType } from "../types/todoType";

// Redux Toolkit을 이용한 todos 슬라이스 생성
const todosSlice = createSlice({
  name: "todos",
  initialState: [] as todoType[],
  reducers: {
    // 전체 todos를 설정하는 액션
    setTodos: (state, action: PayloadAction<todoType[]>) => {
      return action.payload;
    },
    // 새로운 todo를 추가하는 액션
    addTodo: (state, action: PayloadAction<todoType>) => {
      state.push(action.payload);
    },
    // ID를 이용해 todo를 삭제하는 액션
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    // ID를 이용해 todo의 'isDone' 상태를 토글하는 액션
    toggleTodo: (state, action: PayloadAction<string>) => {
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    },
  },
});

export const { setTodos, addTodo, deleteTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
