import { useState, useEffect } from "react";
import Link from "next/link";
import { getTodos, createTodo, updateTodo, Todo } from "../modules/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const TodosPage = ({ filterDone=false }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (summary: string) => {
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
    <>
      <h1>Todos</h1>
      {filterDone ? (
        <>
          <TodoForm onSubmit={addTodo} />
          <h2>Done Todos</h2>
          <TodoList todos={doneTodos} markTodoDone={markTodoDone} />
          <Link href="/todos">
            View open todos
          </Link>
        </>
      ) : (
        <>
          <TodoForm onSubmit={addTodo} />
          <h2>Open Todos</h2>
          <TodoList todos={openTodos} markTodoDone={markTodoDone} />
          <Link href="/done">
              View done todos
          </Link>
        </>
      )}
    </>
  );
};

export default TodosPage;
