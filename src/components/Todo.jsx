import { useRef, useState, useEffect } from "react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const inputRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const getFormattedDate = () => {
    return new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const add = (event) => {
    if (event.type === "click" || event.key === "Enter") {
      const inputText = inputRef.current.value.trim();
      const startDate = startDateRef.current.value;
      const endDate = endDateRef.current.value;

      if (inputText === "" || !startDate || !endDate) return;

      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
        timeAdded: getFormattedDate(),
        completedTime: null,
        startDate,
        endDate,
      };

      setTodoList((prev) => [...prev, newTodo]);

      // Clear input fields
      inputRef.current.value = "";
      startDateRef.current.value = "";
      endDateRef.current.value = "";
    }
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isComplete: !todo.isComplete,
              completedTime: !todo.isComplete ? getFormattedDate() : null,
            }
          : todo
      )
    );
  };

  const editTodo = (id, newText, newStartDate, newEndDate) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText, startDate: newStartDate, endDate: newEndDate }
          : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300 ">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-full"
      >
        {theme === "light" ? <FaMoon className="text-black" /> : <FaSun className="text-yellow-400" />}
      </button>

      <div className="shadow-lg rounded-2xl p-6 w-full max-w-md transition-all" style={{ backgroundColor: "var(--card-bg)" }}>
        <h1 className="text-3xl font-bold flex flex-row items-center justify-center text-center mb-4"><span className="text-2xl">🚀</span>-To-Do List-<span className="text-2xl">🚀</span></h1>

        <div className="flex flex-col space-y-2">
          <input ref={inputRef} className="p-2 border rounded text-lg" type="text" placeholder="Task Name..." onKeyDown={add} />
          <label htmlFor="startDate">Starting Date</label>
          <input id="startDate" ref={startDateRef} className="p-2 border rounded text-lg" type="date" />
          <label htmlFor="endDate ">Ending Date</label>
          <input id="endDate" ref={endDateRef} className="p-2 border rounded text-lg" type="date" />
          <button onClick={add} className="bg-blue-500 hover:bg-blue-600 transition-all p-3 text-white rounded-lg cursor-pointer flex flex-row justify-center items-center">
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