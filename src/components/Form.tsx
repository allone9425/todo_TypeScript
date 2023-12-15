import { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { createTodo, useInvalidateTodos } from "../api/api";
import { todoType } from "../types/todoType";

function Form() {
  //제목 저장하는 State
  const [title, setTitle] = useState("");
  //내용 저장하는 State
  const [contents, setContents] = useState("");
  const invalidateTodos = useInvalidateTodos();

  const onSubmitHandler = async (e: React.FormEvent) => {
    //새로고침 방지
    e.preventDefault();
    const newTodo: todoType = {
      id: v4(),
      title,
      contents,
      isDone: false,
    };
    //새로운 할일 추가
    await createTodo(newTodo);
    setTitle("");
    setContents("");
    invalidateTodos();
    alert("할일이 추가 되었어요!");
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
  box-shadow: 2px 2px 5px #aaa;
  border-radius: 10px;
  form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    input {
      border: none;
      width: 300px;
      border-radius: 5px;
      font-size: 20px;
      padding: 10px;
      margin: 20px 20px 20px 0px;
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
        background-color: #c8ceea;
      }
    }
  }
`;
