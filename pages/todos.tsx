import { useState, useEffect } from "react";
import Link from "next/link";
import { getTodos, createTodo, updateTodo, Todo } from "../modules/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Stack } from "react-bootstrap";

const TodoListPage = ({ filterDone=false }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    loadTodos();
  }, []);

  const handleCreateTodo = async (summary: string) => {
    const todo = await createTodo(summary);
    setTodos((prevTodos) => [todo, ...prevTodos]);
  };

  const markTodoDone = async (id: string) => {
    const updatedTodo = await updateTodo(id, { done: true });
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  const openTodos = todos.filter((todo) => !todo.done);
  const doneTodos = todos.filter((todo) => todo.done);

  return (
    <Stack gap={2} className="col-md-5 mx-auto pt-3">
      <h1>My Todos:</h1>
      {filterDone ? (
        <>
          <h2>Done Todos</h2>
          <TodoList todos={doneTodos} markTodoDone={markTodoDone} />
          <Link href="/todos">
            View open todos
          </Link>
        </>
      ) : (
        <>
          <TodoForm onSubmit={handleCreateTodo} />
          <h2>Open Todos</h2>
          <TodoList todos={openTodos} markTodoDone={markTodoDone} />
          <Link href="/done">
              View done todos
          </Link>
        </>
      )}
    </Stack>
  );
};

export default TodoListPage;
