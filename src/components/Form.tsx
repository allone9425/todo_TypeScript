import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
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
    <FormBox>
      <form>
        <input
          id="title"
          value={title}
          placeholder="제목"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <input
          id="contents"
          placeholder="내용"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button id="addBtn" type="submit" onClick={onSubmitHandler}>
          추가하기
        </button>
      </form>
    </FormBox>
  );
}

export default Form;

const FormBox = styled.div`
  background-color: #eedaea;
  margin: 20px 0;

  border-radius: 10px;
  form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    input {
      border: none;
      width: 330px;
      border-radius: 5px;
      font-size: 20px;
      padding: 10px;
      margin: 15px;
      &::placeholder {
        color: #aaa;
      }
    }
    button {
      border: none;
      font-size: 20px;
      padding: 10px;
      background-color: #d7c6e6;
      color: #555;
      border-radius: 5px;
      font-weight: bold;
      &:hover {
        background-color: #fffacd;
      }
    }
  }
`;
