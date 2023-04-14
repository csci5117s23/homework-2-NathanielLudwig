import { Todo } from "@/modules/api";
import { useState } from "react";

type TodoPreviewProps = {
  todo: Todo;
  markTodoDone: (id: string) => void;
};

const TodoPreview = ({ todo, markTodoDone }: TodoPreviewProps) => {
  const [done, setDone] = useState(false);

  const handleToggleDone = () => {
    markTodoDone(todo._id);
    setDone(!done);
  };

  return (
    <div>
      <span>{todo.summary}</span>
      {!todo.done && <button onClick={handleToggleDone}>Mark as done </button>}
    </div>
  );
};

export default TodoPreview;
