const api = "https://9b4sye07jk.execute-api.ap-south-1.amazonaws.com/deployment"

export const apigetTodo = async () => {
  try {
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating todo:", error);
    return { response: "server error" };
  }
};

export const apipostTodo = async (todoData) => {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    const data = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error updating todo:", error);
    return { response: "server error" };
  }
};

export const apiputTodo = async (id, updatedFields) => {
  try {
    const data = { id, ...updatedFields };
    const response = await fetch(api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const output = await response.json();
    console.log("Response:", output);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const apidelteTodo = async (id) => {
  try {
    const response = await fetch(api, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error updating todo:", error);
    return { response: "server error" };
  }
};
