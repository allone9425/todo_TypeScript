import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteTodo, toggleTodo, useInvalidateTodos } from "../api/api";
import { ListType, todoType } from "../types/todoType";

const fetchTodos = async () => {
  const response = await fetch("http://localhost:4000/todos");
  if (!response.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다");
  }
  return response.json();
};

function List({ isDone }: ListType) {
  const invalidateTodos = useInvalidateTodos();
  const queryClient = useQueryClient();

  const { data: todos } = useQuery(["todos"], fetchTodos); // Pass the query key as an array

  const handleDelete = async (todoId: string) => {
    const isConfirmed = window.confirm("삭제할까요?");
    if (isConfirmed) {
      await deleteTodo(todoId);
      invalidateTodos();
      queryClient.invalidateQueries(["todos"]); // Pass the query key as an array
    }
  };

  const handleToggle = async (todoId: string) => {
    await toggleTodo(todoId);
    invalidateTodos();
    queryClient.invalidateQueries(["todos"]); // Pass the query key as an array
  };
  return (
    <ListBox>
      <h2>{isDone === true ? "완료된 할일 " : "진행중인 할일"}</h2>

      {todos
        ?.filter((item: todoType) => item.isDone === isDone)
        .map((todo: todoType) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.contents}</p>
            <button
              onClick={() => {
                handleToggle(todo.id);
              }}
            >
              {isDone === false ? "완료" : "취소"}
            </button>
            <button
              onClick={() => {
                handleDelete(todo.id);
              }}
            >
              삭제
            </button>
          </div>
        ))}
    </ListBox>
  );
}

export default List;

const ListBox = styled.div`
  h2 {
    background-color: #c8ceea;
    padding: 20px;
    font-weight: bold;
    margin: 10px 0;
  }

  div {
    width: 400px;
    box-shadow: 2px 2px 8px #aaa;
    position: relative;
    border-radius: 10px;
    font-size: 18px;
    display: flex;
    box-sizing: border-box;
    padding-bottom: 35px;
    flex-wrap: wrap;
    line-height: 1.5rem;
    margin: 20px 10px;
    h3 {
      width: 100%;
      background-color: #eedaea;
      padding: 10px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
    p {
      width: 100%;
      padding: 10px;
    }
    button {
      border: none;
      background-color: #d7c6e6;
      padding: 5px 10px;
      font-size: 16px;
      color: #555;
      bottom: 10px;
      border-radius: 5px;
      margin-top: 20px;
      font-weight: 600;
      position: absolute;
      right: 10px;
      &:first-of-type {
        right: 70px;
      }
      &:hover {
        background-color: #c8ceea;
      }
    }
  }
`;
