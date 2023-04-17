import TodoDetails from "@/components/TodoDetails";
import { Todo, getTodo, updateTodo } from "@/modules/api";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    const loadTodos = async () => {
      const token = await getToken({ template: "codehooks" });
      if (token) {
        const todo = await getTodo(token, id);
        setTodo(todo);
      }
    };
    if (id && userId) loadTodos();
  }, [id, getToken, userId]);

  const onUpdate = async (id: string, updates: Partial<Todo>) => {
    const token = await getToken({ template: "codehooks" });
    if (token) {
      const updatedTodo = await updateTodo(token, id, updates);
      setTodo(updatedTodo);
    }
  };

  return (
    <>
      {todo && <TodoDetails todo={todo} onUpdate={onUpdate} />}
    </>
  );
};

export default TodoPage;
