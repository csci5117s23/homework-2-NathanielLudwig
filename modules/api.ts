export type Todo = {
    _id: string;
    summary: string;
    done: boolean;
    createdOn: string;
};

const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodos(): Promise<Todo[]> {
    const response = await fetch(`${BASE_API_URL}/todos`);
    return await response.json();
}

export async function createTodo(summary: string): Promise<Todo> {
    const response = await fetch(`${BASE_API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ summary }),
    });
    return await response.json();
}

export async function updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${BASE_API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });
    return await response.json();
}

export async function deleteTodo(id: string): Promise<void> {
    await fetch(`${BASE_API_URL}/todos/${id}`, { method: "DELETE" });
}
