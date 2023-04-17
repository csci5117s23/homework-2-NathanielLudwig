export type Todo = {
    _id: string;
    summary: string;
    done: boolean;
    category: string;
    createdOn: string;
};

export type Category = {
    _id: string;
    name: string;
};

const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function getTodos(authToken: string): Promise<Todo[]> {
    const response = await fetch(`${BASE_API_URL}/todos?sort=createdOn`, {
        method:'GET',
        headers: {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}

export async function getCategories(authToken: string): Promise<Category[]> {
    const response = await fetch(`${BASE_API_URL}/category`, {
        method:'GET',
        headers: {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}

export async function getTodosByCategory(authToken: string, category: string): Promise<Todo[]> {
    const response = await fetch(`${BASE_API_URL}/todos?category=${category}`, {
        method:'GET',
        headers: {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}

export async function deleteCategory(authToken: string, id: string): Promise<Category[]> {
    const response = await fetch(`${BASE_API_URL}/category/${id}`, {
        method: "DELETE",
        headers: {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}

export async function getTodo(authToken: string, id: string): Promise<Todo> {
    const response = await fetch(`${BASE_API_URL}/todos/${id}`, {
        method:'GET',
        headers: {'Authorization': 'Bearer ' + authToken}
    });
    return await response.json();
}
export async function createTodo(authToken: string, todo: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${BASE_API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(todo),
    });
    return await response.json();
}

export async function createCategory(authToken: string, category: Partial<Category>): Promise<Category> {
    const response = await fetch(`${BASE_API_URL}/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(category),
    });
    return await response.json();
}

export async function updateTodo(authToken: string, id: string, updates: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${BASE_API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(updates),
    });
    return await response.json();
}
