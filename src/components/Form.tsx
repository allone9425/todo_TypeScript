import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { addTodo } from "../redux/todos";
import { todoType } from "../types/todoType";
function Form() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: todoType = {
      id: v4(),
      title,
      contents,
      isDone: false,
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    setContents("");
  };
  return (
    <div>
      <form>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="contents">내용</label>
        <input
          id="contents"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button id="addBtn" type="submit" onClick={onSubmitHandler}>
          추가하기
        </button>
      </form>
    </div>
  );
}

export default Form;
