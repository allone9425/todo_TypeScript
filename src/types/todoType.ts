export type todoType = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

export type ListType = {
  isDone: boolean;
};

export type AddTodoAction = {
  type: string;
  payload: todoType;
};
