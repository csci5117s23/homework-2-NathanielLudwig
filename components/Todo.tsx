import { useState } from "react";

type TodoProps = {
  id: number;
  summary: string;
  done: boolean;
  onEdit: (id: number, summary: string) => void;
  onToggleDone: (id: number) => void;
};

const Todo = ({ id, summary, done, onEdit, onToggleDone }: TodoProps) => {
  const [editing, setEditing] = useState(false);
  const [newSummary, setNewSummary] = useState(summary);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit(id, newSummary);
    setEditing(false);
  };

  const handleCancel = () => {
    setNewSummary(summary);
    setEditing(false);
  };

  const handleToggleDone = () => {
    onToggleDone(id);
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            value={newSummary}
            onChange={(e) => setNewSummary(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{summary}</span>
          <button onClick={handleEdit}>Edit</button>
          <input
            type="checkbox"
            checked={done}
            onChange={handleToggleDone}
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
