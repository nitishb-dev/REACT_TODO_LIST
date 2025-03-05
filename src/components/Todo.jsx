// import { useRef, useState, useEffect } from "react";
// import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
// import TodoItems from "./TodoItems";

// const Todo = () => {
//   const [todoList, setTodoList] = useState(
//     JSON.parse(localStorage.getItem("todos")) || []
//   );
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   const inputRef = useRef();
//   const startDateRef = useRef();
//   const endDateRef = useRef();

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

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

//   const add = (event) => {
//     if (event.type === "click" || event.key === "Enter") {
//       const inputText = inputRef.current.value.trim();
//       const startDate = startDateRef.current.value;
//       const endDate = endDateRef.current.value;

//       if (inputText === "" || !startDate || !endDate) return;

//       const newTodo = {
//         id: Date.now(),
//         text: inputText,
//         isComplete: false,
//         timeAdded: getFormattedDate(),
//         completedTime: null,
//         startDate,
//         endDate,
//       };

//       setTodoList((prev) => [...prev, newTodo]);

//       // Clear input fields
//       inputRef.current.value = "";
//       startDateRef.current.value = "";
//       endDateRef.current.value = "";
//     }
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
//               completedTime: !todo.isComplete ? getFormattedDate() : null,
//             }
//           : todo
//       )
//     );
//   };

//   const editTodo = (id, newText, newStartDate, newEndDate) => {
//     setTodoList((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id
//           ? { ...todo, text: newText, startDate: newStartDate, endDate: newEndDate }
//           : todo
//       )
//     );
//   };

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todoList));
//   }, [todoList]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300">
//       <button
//         onClick={toggleTheme}
//         className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-full"
//       >
//         {theme === "light" ? <FaMoon className="text-black" /> : <FaSun className="text-yellow-400" />}
//       </button>

//       <div className="shadow-lg rounded-2xl p-6 w-full max-w-md transition-all" style={{ backgroundColor: "var(--card-bg)" }}>
//         <h1 className="text-3xl font-bold flex flex-row items-center justify-center text-center mb-4"><span className="text-2xl">🚀</span>-To-Do List-<span className="text-2xl">🚀</span></h1>

//         <div className="flex flex-col space-y-2">
//           <input ref={inputRef} className="p-2 border rounded text-lg" type="text" placeholder="Task Name..." onKeyDown={add} />
//           <label htmlFor="startDate">Starting Date</label>
//           <input id="startDate" ref={startDateRef} className="p-2 border rounded text-lg" type="date" />
//           <label htmlFor="endDate ">Ending Date</label>
//           <input id="endDate" ref={endDateRef} className="p-2 border rounded text-lg" type="date" />
//           <button onClick={add} className="bg-blue-500 hover:bg-blue-600 transition-all p-3 text-white rounded-lg cursor-pointer flex flex-row justify-center items-center">
//             <FaPlus className="mr-2" /> Add Task
//           </button>
//         </div>

//         <div className="mt-4">
//           {todoList.length > 0 ? (
//             todoList.map((item) => (
//               <TodoItems
//                 key={item.id}
//                 {...item}
//                 deleteTodo={deleteTodo}
//                 toggle={toggle}
//                 editTodo={editTodo}
//               />
//             ))
//           ) : (
//             <p className="text-center mt-4">No tasks yet!</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Todo;


import { useRef, useState, useEffect } from "react";
import { FaPlus, FaMoon, FaSun } from "react-icons/fa";
import TodoItems from "./TodoItems";

const API_URL = "https://omh0mbb5td.execute-api.ap-south-1.amazonaws.com/Dev"; // Replace with your API Gateway URL

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
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

  // Fetch tasks from AWS Lambda (DynamoDB)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTodoList(data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const add = (event) => {
    if (event.type === "click" || event.key === "Enter") {
      const inputText = inputRef.current.value.trim();
      const startDate = startDateRef.current.value;
      const endDate = endDateRef.current.value;
  
      if (inputText === "" || !startDate || !endDate) {
        alert("Please enter task details!");
        return;
      }
  
      const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
        timeAdded: getFormattedDate(),
        completedTime: null,
        startDate,
        endDate,
      };
  
      setTodoList((prev) => {
        const updatedTodos = [...prev, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Immediate Storage Update
        return updatedTodos;
      });
  
      console.log("New Task Added:", newTodo); // Debugging Log
  
      // Clear input fields
      inputRef.current.value = "";
      startDateRef.current.value = "";
      endDateRef.current.value = "";
    }
  };
  
  const editTodo = async (id, newText, newStartDate, newEndDate) => {
    const updatedTask = {
      id, // Ensure ID is sent to identify the task
      text: newText,
      startDate: newStartDate,
      endDate: newEndDate
    };
  
    try {
      const response = await fetch(`https://your-api-url/tasks`, { // Ensure correct API URL
        method: "PUT", // Use PUT to update
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
      });
  
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
  
      setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTask } : todo
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`https://omh0mbb5td.execute-api.ap-south-1.amazonaws.com/Dev${id}`, {
        method: "DELETE"
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
  
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  const toggle = async (id) => {
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

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isComplete: !todoList.find((todo) => todo.id === id).isComplete,
          completedTime: !todoList.find((todo) => todo.id === id).isComplete
            ? getFormattedDate()
            : null,
        }),
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 p-3 rounded-full"
      >
        {theme === "light" ? <FaMoon className="text-black" /> : <FaSun className="text-yellow-400" />}
      </button>

      <div className="shadow-lg rounded-2xl p-6 w-full max-w-md transition-all" style={{ backgroundColor: "var(--card-bg)" }}>
        <h1 className="text-3xl font-bold flex flex-row items-center justify-center text-center mb-4">
          <span className="text-2xl">🚀</span>-To-Do List-<span className="text-2xl">🚀</span>
        </h1>

        <div className="flex flex-col space-y-2">
          <input ref={inputRef} className="p-2 border rounded text-lg" type="text" placeholder="Task Name..." onKeyDown={add} />
          <label htmlFor="startDate">Starting Date</label>
          <input id="startDate" ref={startDateRef} className="p-2 border rounded text-lg" type="date" />
          <label htmlFor="endDate">Ending Date</label>
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
