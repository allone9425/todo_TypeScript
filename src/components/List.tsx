import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  deleteTodo,
  fetchTodos,
  toggleTodo,
  useInvalidateTodos,
} from "../api/api";
import { ListType, todoType } from "../types/todoType";

function List({ isDone }: ListType) {
  // 할 일 목록을 저장하는 State
  const [todos, setTodos] = useState<todoType[]>([]);
  const invalidateTodos = useInvalidateTodos();

  useEffect(() => {
    const fetchAndSetTodos = async () => {
      // 할 일 목록을 가져옴
      const fetchedTodos = await fetchTodos();
      // 가져온 할 일 목록을 설정
      setTodos(fetchedTodos);
    };
    // 컴포넌트가 마운트될 때 할 일 목록을 가져오도록 호출
    fetchAndSetTodos();
  }, [invalidateTodos]);

  const handleDelete = async (todoId: string) => {
    const isConfirmed = window.confirm("삭제할까요?");
    if (isConfirmed) {
      //할일 삭제
      await deleteTodo(todoId);
      //삭제한 할 일을 제외한 나머지 할 일 목록 업데이트
      setTodos(todos.filter((todo) => todo.id !== todoId));
      //할일목록 무효화
      invalidateTodos();
    }
  };

  const handleToggle = async (todoId: string) => {
    // 할 일의 완료 상태 토글
    await toggleTodo(todoId);
    // 완료 상태가 변경된 할 일을 업데이트
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    // 할 일 목록을 무효화
    invalidateTodos();
  };

  return (
    <ListBox>
      <h2>{isDone === true ? "완료된 할일 " : "진행중인 할일"}</h2>

      {todos
        .filter((item) => item.isDone === isDone)
        .map((todo) => (
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
