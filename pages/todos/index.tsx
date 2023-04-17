import { useState, useEffect } from "react";
import Link from "next/link";
import { getTodos, createTodo, updateTodo, Todo, getTodosByCategory, getCategories, Category, deleteCategory, createCategory } from "../../modules/api";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import { Button, Form, ListGroup, Modal, Nav, Stack } from "react-bootstrap";
import { UserButton, useAuth } from "@clerk/nextjs";

type TodoListPageProps = {
  filterDone: boolean;
  category: string | null;
};

const TodoListPage = ({ filterDone = false, category = null }: TodoListPageProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const loadTodos = async () => {
      const token = await getToken({ template: "codehooks" });
      if (token) {
        const todos = category ? await getTodosByCategory(token, category) : await getTodos(token);
        setTodos(todos.reverse());
      }
    };
    const loadCategories = async () => {
      const token = await getToken({ template: "codehooks" });
      if (token) {
        const categories = await getCategories(token);
        setAllCategories(categories);
      }
    };
    if (userId) {
      loadTodos();
      loadCategories();
    }
  }, [category, isLoaded, userId, getToken]);

  const handleCreateTodo = async (summary: string) => {
    let todo: Partial<Todo> = { summary: summary }
    if (category) {
      todo = { ...todo, category: category }
    }
    const token = await getToken({ template: "codehooks" });
    console.log(token);
    if (token) {
      const newTodo = await createTodo(token, todo);
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    }
  };
  
  const handleDeleteCategory = async (id: string) => {
    const token = await getToken({ template: "codehooks" });
    if (token) {
      const response = await deleteCategory(token, id);
      setAllCategories((prevCategories) => prevCategories.filter((e) => e._id !== id));
    }
  };

  const handleCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newCategory.trim()) {
      const token = await getToken({ template: "codehooks" });
      if (token) {
        const createdCategory = await createCategory(token, {name: newCategory.trim()});
        setAllCategories((prevCategories) => [createdCategory, ...prevCategories]);
        setNewCategory("");
      }
    }
  };

  const markTodoDone = async (id: string) => {
    const token = await getToken({ template: "codehooks" });
    if (token) {
      const updatedTodo = await updateTodo(token, id, { done: true });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openTodos = todos.filter((todo) => !todo.done);
  const doneTodos = todos.filter((todo) => todo.done);

  return (
    <>
      <Stack gap={2} className="col-md-5 mx-auto py-3 px-3">
        <Stack direction="horizontal" gap={3}>
          <h1>My Todos:</h1>
          <div className="ms-auto">
            <UserButton />
          </div>
        </Stack>
        {!filterDone && <TodoForm onSubmit={handleCreateTodo} />}
        <Button variant="primary" onClick={handleShow}>
          Filter Todos by category
        </Button>
        <Nav fill variant="tabs" defaultActiveKey={filterDone ? "done" : "open"}>
          <Nav.Item>
            <Nav.Link as={Link} href={category ? `/todos/${category}` : "/todos"} eventKey="open">Open Todos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} href={category ? `/done/${category}` : "/done"} eventKey="done">Done Todos</Nav.Link>
          </Nav.Item>
        </Nav>
        <TodoList todos={filterDone ? doneTodos : openTodos} markTodoDone={markTodoDone} />
      </Stack>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <Form onSubmit={handleCategorySubmit}>
              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                <Form.Label>Create a category:</Form.Label>
                <Form.Control
                  type="text"
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Add</Button>
            </Form>
            <ListGroup>
              {allCategories.map((cat) => (
                <ListGroup.Item key={cat._id}>
                  <Stack direction="horizontal" gap={3}>
                    <Link href={`/${filterDone ? "done" : "todos"}/${cat.name}`} style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{cat.name}</Link>
                    <Button variant="danger" className="ms-auto" onClick={() => handleDeleteCategory(cat._id)}>Delete</Button>
                  </Stack>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoListPage;
