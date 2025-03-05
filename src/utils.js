const API_BASE_URL = "https://omh0mbb5td.execute-api.ap-south-1.amazonaws.com/Dev";

export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todo`);
  return response.json();
};

export const addTodo = async (todo) => {
  await fetch(`${API_BASE_URL}/todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};

export const updateTodo = async (todo) => {
  await fetch(`${API_BASE_URL}/todo`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (id) => {
  await fetch(`${API_BASE_URL}/todo`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};
