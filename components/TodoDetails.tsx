import { useState } from "react";
import { Todo } from "@/modules/api";
import Link from "next/link";
import { Button, ButtonGroup, Form, Stack } from "react-bootstrap";

type TodoDetailsProps = {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onToggleDone: (id: string) => void;
};

const TodoDetails = ({ todo, onUpdate }: TodoDetailsProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newSummary, setNewSummary] = useState<string>(todo.summary);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo._id, {summary: newSummary});
    setEditing(false);
  };

  const handleCancel = () => {
    setNewSummary(todo.summary);
    setEditing(false);
  };

  const handleMarkdone = () => {
    onUpdate(todo._id, {done: true});
  };

  return (
    <Stack gap={2} className="col-md-5 mx-auto pt-3">
      <Link href='/todos'>
        <Button variant="primary">Back to all todos</Button>
      </Link>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Todo Contents:</Form.Label>
          <Form.Control
            as="textarea"
            value={newSummary}
            onChange={(e) => setNewSummary(e.target.value)}
            disabled={!editing}
          />
        </Form.Group>
      </Form>
      {editing ? (
        <div>
          <ButtonGroup>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button variant="danger" onClick={handleCancel}>Cancel</Button>
          </ButtonGroup>
        </div>
      ) : (
        <div>
          <Button variant="primary" onClick={handleEdit}>Edit</Button>
        </div>
      )}
      {!todo.done && <button onClick={handleMarkdone}>Mark as done </button>}
    </Stack>
  );
};

export default TodoDetails;
