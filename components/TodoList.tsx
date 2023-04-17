import { Todo } from "@/modules/api";
import { Button, ListGroup, Stack } from "react-bootstrap";
import Link from "next/link";

type TodoListProps = {
  todos: Todo[];
  markTodoDone: (id: string) => void;
};

const TodoList = ({ todos, markTodoDone }: TodoListProps) => {
  return (
    <ListGroup>
      {todos.map((todo) => (
          <ListGroup.Item key={todo._id}>
            <Stack direction="horizontal" gap={3}>
              <Link href={`/todo/${todo._id}`} style={{textOverflow: "ellipsis", overflow: "hidden"}}>{todo.summary}</Link>
              {!todo.done && <Button className="ms-auto" onClick={() => markTodoDone(todo._id)}>Mark as done</Button>}
            </Stack>
          </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TodoList;
