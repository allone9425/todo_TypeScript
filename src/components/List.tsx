import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deleteTodo, switchTodo } from "../redux/todos";
import { ListType } from "../types/todoType";
function List({ isDone }: ListType) {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{isDone === true ? "완료 " : "진행중"}</h2>
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
    </div>
  );
}

export default List;
