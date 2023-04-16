import TodoDetails from "@/components/TodoDetails";
import { Todo, getTodo } from "@/modules/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";

const TodoPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);

  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    const loadTodos = async () => {
      const todo = await getTodo(id);
      setTodo(todo);
    };
    if (id) loadTodos();
  }, [id]);

  return (
    <>
      {todo && <TodoDetails todo={todo} />}
    </>
    // <Container>
    //   <Row>
    //     <Col md={{ span: 6, offset: 3 }}>
    //       {todo && <TodoDetails todo={todo} />}
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default TodoPage;
