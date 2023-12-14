import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../redux/store";
import { deleteTodo, switchTodo } from "../redux/todos";
import { ListType } from "../types/todoType";
function List({ isDone }: ListType) {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  return (
    <ListBox>
      <h2>{isDone === true ? "완료된 할일 " : "진행중인 할일"}</h2>
      {todos
        .filter((item) => item.isDone === isDone)
        .map((todo) => (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.id}</p>
            <p>{todo.contents}</p>
            <p>{String(todo.isDone)}</p>
            <button
              onClick={() => {
                dispatch(switchTodo(todo.id));
              }}
            >
              {isDone === false ? "완료" : "취소"}
            </button>
            <button
              onClick={() => {
                dispatch(deleteTodo(todo.id));
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
    background-color: #eedaea;
    width: 400px;

    position: relative;
    border-radius: 10px;
    font-size: 16px;
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    line-height: 1.5rem;
    margin: 20px 0;
    h3 {
      width: 100%;
      background-color: #d7c6e6;
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
        background-color: #fffacd;
      }
    }
  }
`;
