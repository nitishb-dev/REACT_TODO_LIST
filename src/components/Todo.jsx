// import { useRef, useState, useEffect } from "react";
// import { FaPlus } from "react-icons/fa";
// import TodoItems from "./TodoItems";

// const Todo = () => {
//   const [todoList, setTodoList] = useState(
//     JSON.parse(localStorage.getItem("todos")) || []
//   );

//   const inputRef = useRef();

//   const getFormattedDate = () => {
//     return new Date().toLocaleString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     });
//   };

//   const add = () => {
//     const inputText = inputRef.current.value.trim();
//     if (inputText === "") return;

//     const newTodo = {
//       id: Date.now(),
//       text: inputText,
//       isComplete: false,
//       timeAdded: getFormattedDate(), // Store creation time
//       completedTime: null, // Initially null
//     };

//     setTodoList((prev) => [...prev, newTodo]);
//     inputRef.current.value = "";
//   };

//   const deleteTodo = (id) => {
//     setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   const toggle = (id) => {
//     setTodoList((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id
//           ? {
//               ...todo,
//               isComplete: !todo.isComplete,
//               completedTime: !todo.isComplete ? getFormattedDate() : null, // Store completion time
//             }
//           : todo
//       )
//     );
//   };

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todoList));
//   }, [todoList]);

//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
//         🚀 To-Do List
//       </h1>

//       <div className="flex items-center bg-gray-200 rounded-lg overflow-hidden">
//         <input
//           ref={inputRef}
//           className="bg-transparent flex-1 p-3 text-lg focus:outline-none"
//           type="text"
//           placeholder="Add a task..."
//         />
//         <button
//           onClick={add}
//           className="bg-blue-500 hover:bg-blue-600 transition-all p-4 text-white rounded-lg cursor-pointer"
//         >
//           <FaPlus />
//         </button>
//       </div>

//       <div className="mt-4">
//         {todoList.length > 0 ? (
//           todoList.map((item) => (
//             <TodoItems
//               key={item.id}
//               text={item.text}
//               id={item.id}
//               isComplete={item.isComplete}
//               deleteTodo={deleteTodo}
//               toggle={toggle}
//               timeAdded={item.timeAdded}
//               completedTime={item.completedTime}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500 text-center mt-4">No tasks yet!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Todo;

import { useRef, useState, useEffect } from "react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const inputRef = useRef();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      timeAdded: getFormattedDate(),
      completedTime: null,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-full"
      >
        {theme === "light" ? <FaMoon className="text-black" /> : <FaSun className="text-yellow-400" />}
      </button>

      <div className="shadow-lg rounded-2xl p-6 w-full max-w-md transition-all" style={{ backgroundColor: "var(--card-bg)" }}>
        <h1 className="text-3xl font-bold text-center mb-4">🚀 To-Do List</h1>

        <div className="flex items-center rounded-lg overflow-hidden" style={{ backgroundColor: "var(--input-bg)" }}>
          <input
            ref={inputRef}
            className="bg-transparent flex-1 p-3 text-lg focus:outline-none"
            type="text"
            placeholder="Add a task..."
          />
          <button
            onClick={add}
            className="bg-blue-500 hover:bg-blue-600 transition-all p-4 text-white rounded-lg cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>

        <div className="mt-4">
          {todoList.length > 0 ? (
            todoList.map((item) => (
              <TodoItems
                key={item.id}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
                timeAdded={item.timeAdded}
                completedTime={item.completedTime}
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

