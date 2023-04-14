import { Todo } from "@/modules/api";
import TodoPreview from "./TodoPreview";

type TodoListProps = {
  todos: Todo[];
  markTodoDone: (id: string) => void;
};

const TodoList = ({ todos, markTodoDone }: TodoListProps) => {

  return (
    <>
      {todos.map((todo) => (
        <TodoPreview
          key={todo._id}
          todo={todo}
          markTodoDone={markTodoDone}
        />
      ))}
    </>
  );
};

export default TodoList;
