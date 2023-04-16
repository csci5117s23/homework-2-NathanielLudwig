import { useState } from "react";
import { Button, Form } from "react-bootstrap";

type TodoFormProps = {
  onSubmit: (summary: string) => void;
};

const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [summary, setSummary] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (summary.trim()) {
      onSubmit(summary.trim());
      setSummary("");
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
          <Form.Label>Add a todo:</Form.Label>
          <Form.Control
            type="text"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add</Button>
      </Form>
    </>
  );
};

export default TodoForm;
