// // import { FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";

// // const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime }) => {
// //   return (
// //     <div className="flex flex-col bg-gray-100 p-3 rounded-lg mt-3 transition-all hover:shadow-md">
// //       <div className="flex items-center justify-between">
// //         <div onClick={() => toggle(id)} className="flex items-center cursor-pointer">
// //           {isComplete ? (
// //             <FaCheckCircle className="text-green-500 text-xl" />
// //           ) : (
// //             <FaRegCircle className="text-gray-400 text-xl" />
// //           )}
// //           <p
// //             className={`ml-3 text-lg ${
// //               isComplete ? "line-through text-gray-500" : "text-gray-800"
// //             }`}
// //           >
// //             {text}
// //           </p>
// //         </div>
// //         <button onClick={() => deleteTodo(id)} className="text-red-500 cursor-pointer">
// //           <FaTrash />
// //         </button>
// //       </div>
// //       <p className="text-gray-500 text-sm mt-1 ml-8">
// //         {isComplete ? `✅ Completed on: ${completedTime}` : `📅 Added on: ${timeAdded}`}
// //       </p>
// //     </div>
// //   );
// // };

// // export default TodoItems;

// import { FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";

// const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime }) => {
//   return (
//     <div className="flex flex-col p-3 rounded-lg mt-3 transition-all hover:shadow-md" style={{ backgroundColor: "var(--card-bg)" }}>
//       <div className="flex items-center justify-between">
//         <div onClick={() => toggle(id)} className="flex items-center cursor-pointer">
//           {isComplete ? (
//             <FaCheckCircle className="text-green-500 text-xl" />
//           ) : (
//             <FaRegCircle className="text-gray-400 text-xl" />
//           )}
//           <p
//             className="ml-3 text-lg"
//             style={{ color: isComplete ? "gray" : "var(--text-color)", textDecoration: isComplete ? "line-through" : "none" }}
//           >
//             {text}
//           </p>
//         </div>
//         <button onClick={() => deleteTodo(id)} className="text-red-500 cursor-pointer">
//           <FaTrash />
//         </button>
//       </div>
//       <p className="text-sm mt-1 ml-8" style={{ color: "gray" }}>
//         {isComplete ? `✅ Completed on: ${completedTime}` : `📅 Added on: ${timeAdded}`}
//       </p>
//     </div>
//   );
// };

// export default TodoItems;

import { FaTrash, FaCheckCircle, FaRegCircle, FaEdit, FaSave } from "react-icons/fa";
import { useState, useRef } from "react";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const inputRef = useRef();

  const handleSave = () => {
    if (newText.trim() !== "") {
      editTodo(id, newText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 p-3 rounded-lg mt-3 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div onClick={() => toggle(id)} className="flex items-center cursor-pointer">
          {isComplete ? (
            <FaCheckCircle className="text-green-500 text-xl" />
          ) : (
            <FaRegCircle className="text-gray-400 text-xl" />
          )}
          {isEditing ? (
            <input
              ref={inputRef}
              className="ml-3 p-1 border rounded text-lg"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              autoFocus
            />
          ) : (
            <p className={`ml-3 text-lg ${isComplete ? "line-through text-gray-500" : "text-gray-800"}`}>
              {text}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <button onClick={handleSave} className="text-blue-500 cursor-pointer">
              <FaSave />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-yellow-500 cursor-pointer">
              <FaEdit />
            </button>
          )}
          <button onClick={() => deleteTodo(id)} className="text-red-500 cursor-pointer">
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-1 ml-8">
        {isComplete ? `✅ Completed on: ${completedTime}` : `📅 Added on: ${timeAdded}`}
      </p>
    </div>
  );
};

export default TodoItems;
