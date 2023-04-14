import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="summary">Add a todo:</label>
      <input
        type="text"
        id="summary"
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
