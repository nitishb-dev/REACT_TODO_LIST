const API_BASE_URL = "https://omh0mbb5td.execute-api.ap-south-1.amazonaws.com/todo"; // Ensure the correct base path

export const fetchTodos = async () => {
  const response = await fetch(API_BASE_URL);
  return response.json();
};

export const addTodo = async (todo) => {
  await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
};

export const updateTodo = async (id, updatedTodo) => {
  await fetch(`${API_BASE_URL}/${id}`, { // Append `id` to update specific task
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
};

export const deleteTodo = async (id) => {
  await fetch(`${API_BASE_URL}/${id}`, { // Append `id` to delete specific task
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};
