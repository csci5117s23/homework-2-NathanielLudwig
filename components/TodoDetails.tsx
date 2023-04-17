import { useState } from "react";
import { Todo } from "@/modules/api";
import Link from "next/link";
import { Button, ButtonGroup, Form, Stack } from "react-bootstrap";
import { UserButton } from "@clerk/nextjs";

type TodoDetailsProps = {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
};

const TodoDetails = ({ todo, onUpdate }: TodoDetailsProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [newSummary, setNewSummary] = useState<string>(todo.summary);
  const [newCategory, setNewCategory] = useState<string>(todo.category);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo._id, {summary: newSummary, category: newCategory});
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
    <Stack gap={2} className="col-md-5 mx-auto py-3 px-3">
      <Stack direction="horizontal" gap={3}>
        <Link href='/todos'>
          <Button variant="primary">Back to all todos</Button>
        </Link>
        <div className="ms-auto">
          <UserButton />
        </div>
      </Stack>
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
        {editing && (
          <Form.Group controlId="exampleForm.ControlTextarea2">
            <Form.Label>Change Category:</Form.Label>
            <Form.Control
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              disabled={!editing}
            />
          </Form.Group>
        )}
      </Form>
      {editing ? (
        <ButtonGroup>
          <Button variant="primary" onClick={handleSave}>Save</Button>
          <Button variant="danger" onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      ) : (
        <Button variant="primary" onClick={handleEdit}>Edit</Button>
      )}
      {!todo.done && <Button onClick={handleMarkdone}>Mark as done </Button>}
    </Stack>
  );
};

export default TodoDetails;
