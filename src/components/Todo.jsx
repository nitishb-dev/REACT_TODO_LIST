import { useRef, useState, useEffect } from "react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import TodoItems from "./TodoItems";
import {
  apigetTodo,
  apipostTodo,
  apidelteTodo,
  apiputTodo,
} from "./api_request";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const inputRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  useEffect(() => {
    getTodoFunc();
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const getTodoFunc = async () => {
    try {
      const response = await apigetTodo();
      console.log("Fetched Todos:", response);

      // Ensure response has a valid body with results
      if (response && response.body && response.body.results) {
        setTodoList(response.body.results); // Fix here
      } else {
        setTodoList([]); // Fallback if no todos found
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodoList([]); // Handle errors gracefully
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const getFormattedDate = () =>
    new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  const add = async (event) => {
    if (event.type === "click" || event.key === "Enter") {
      const inputText = inputRef.current.value.trim();
      const startDate = startDateRef.current.value;
      const endDate = endDateRef.current.value;

      if (!inputText || !startDate || !endDate) return;

      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
        timeAdded: getFormattedDate(),
        completedTime: null,
        startDate,
        endDate,
      };

      try {
        await apipostTodo(newTodo);
        await getTodoFunc();
      } catch (error) {
        console.error("Error adding todo:", error);
      }

      inputRef.current.value = "";
      startDateRef.current.value = "";
      endDateRef.current.value = "";
    }
  };

  const deleteTodo = async (id) => {
    try {
      await apidelteTodo(id);
      await getTodoFunc();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggle = async (id) => {
    const todo = todoList.find((item) => item.id === id);
    if (!todo) return;
    const updatedState = todo.isComplete ? 0 : 1;
    try {
      await apiputTodo(id, { isComplete: updatedState });
      await getTodoFunc();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const editTodo = async (id, newText, newStartDate, newEndDate) => {
    if (!newText.trim() || !newStartDate || !newEndDate) return;
    try {
      await apiputTodo(id, {
        text: newText,
        startDate: newStartDate,
        endDate: newEndDate,
      });
      await getTodoFunc();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-full"
      >
        {theme === "light" ? (
          <FaMoon className="text-black" />
        ) : (
          <FaSun className="text-yellow-400" />
        )}
      </button>

      <div className="shadow-lg rounded-2xl p-6 w-full max-w-md transition-all">
        <h1 className="text-3xl font-bold text-center mb-4">
          🚀 To-Do List 🚀
        </h1>

        <div className="flex flex-col space-y-2">
          <input
            ref={inputRef}
            className="p-2 border rounded text-lg"
            type="text"
            placeholder="Task Name..."
            onKeyDown={add}
          />
          <label htmlFor="startDate">Starting Date</label>
          <input
            id="startDate"
            ref={startDateRef}
            className="p-2 border rounded text-lg"
            type="date"
          />
          <label htmlFor="endDate">Ending Date</label>
          <input
            id="endDate"
            ref={endDateRef}
            className="p-2 border rounded text-lg"
            type="date"
          />
          <button
            onClick={add}
            className="bg-blue-500 hover:bg-blue-600 p-3 text-white rounded-lg flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Add Task
          </button>
        </div>

        <div className="mt-4">
          {todoList.length > 0 ? (
            todoList.map((item) => (
              <TodoItems
                key={item.id}
                {...item}
                deleteTodo={deleteTodo}
                toggle={toggle}
                editTodo={editTodo}
              />
            ))
          ) : (
            <p className="text-center mt-4">No tasks yet!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
