// import { FaTrash, FaCheckCircle, FaRegCircle, FaEdit, FaSave } from "react-icons/fa";
// import { useState, useRef } from "react";

// const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime, startDate, endDate, editTodo }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newText, setNewText] = useState(text);
//   const [newStartDate, setNewStartDate] = useState(startDate);
//   const [newEndDate, setNewEndDate] = useState(endDate);
//   const inputRef = useRef();

//   const handleSave = () => {
//     if (newText.trim() !== "" && newStartDate && newEndDate) {
//       editTodo(id, newText, newStartDate, newEndDate);
//       setIsEditing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-gray-100 p-3 rounded-lg mt-3 transition-all hover:shadow-md">
//       <div className="flex items-center justify-between">
//         <div onClick={() => toggle(id)} className="flex items-center cursor-pointer">
//           {isComplete ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
          
//           {isEditing ? (
//             <input ref={inputRef} className="ml-3 p-1 border rounded text-lg" value={newText} onChange={(e) => setNewText(e.target.value)} autoFocus />
//           ) : (
//             <p className={`ml-3 text-lg ${isComplete ? "line-through text-gray-500" : "text-gray-800"}`}>
//               {text}
//             </p>
//           )}
//         </div>
//         <div className="flex space-x-2">
//           {isEditing ? (
//             <button onClick={handleSave} className="text-blue-500 cursor-pointer">
//               <FaSave />
//             </button>
//           ) : (
//             <button onClick={() => setIsEditing(true)} className="text-yellow-500 cursor-pointer">
//               <FaEdit />
//             </button>
//           )}
//           <button onClick={() => deleteTodo(id)} className="text-red-500 cursor-pointer">
//             <FaTrash />
//           </button>
//         </div>
//       </div>
      
//       <p className="text-gray-500 text-sm mt-1 ml-8">
//         📅 Start: {startDate} | ⏳ End: {endDate}
//       </p>
      
//       <p className="text-gray-500 text-sm mt-1 ml-8">
//         {isComplete ? `✅ Completed on: ${completedTime}` : `🕒 Added on: ${timeAdded}`}
//       </p>
//     </div>
//   );
// };

// export default TodoItems;

// import { FaTrash, FaCheckCircle, FaRegCircle, FaEdit, FaSave } from "react-icons/fa";
// import { useState } from "react";

// const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime, startDate, endDate, editTodo }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newText, setNewText] = useState(text);
//   const [newStartDate, setNewStartDate] = useState(startDate);
//   const [newEndDate, setNewEndDate] = useState(endDate);

//   const handleSave = () => {
//     if (newText.trim() && newStartDate && newEndDate) {
//       editTodo(id, newText, newStartDate, newEndDate);
//       setIsEditing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-gray-100 p-3 rounded-lg mt-3">
//       <div className="flex items-center justify-between">
//         <div onClick={() => toggle(id)} className="flex items-center cursor-pointer">
//           {isComplete ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
//           <p className={`ml-3 text-lg ${isComplete ? "line-through text-gray-500" : "text-gray-800"}`}>{text}</p>
//         </div>
//         <button onClick={() => deleteTodo(id)} className="text-red-500 cursor-pointer"><FaTrash /></button>
//       </div>
//     </div>
//   );
// };

// export default TodoItems;


import { CheckCircle, Circle, Trash2, Edit, Save } from "lucide-react";
import { useState } from "react";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime, startDate, endDate, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);

  const handleSave = () => {
    if (newText.trim() && newStartDate && newEndDate) {
      editTodo(id, newText, newStartDate, newEndDate);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-2xl shadow-md mt-3 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        {/* Task Toggle */}
        <div onClick={() => toggle(id)} className="flex items-center cursor-pointer transition-all">
          {isComplete ? (
            <CheckCircle className="text-green-500 text-2xl transition-all duration-300 hover:scale-110" />
          ) : (
            <Circle className="text-gray-400 text-2xl transition-all duration-300 hover:scale-110" />
          )}
          <p className={`ml-3 text-lg transition-all ${isComplete ? "line-through text-gray-500" : "text-gray-800"}`}>
            {text}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          {isEditing ? (
            <button onClick={handleSave} className="text-blue-500 transition-all hover:text-blue-700">
              <Save className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="text-gray-500 transition-all hover:text-gray-800">
              <Edit className="w-5 h-5" />
            </button>
          )}

          {/* Delete Button */}
          <button onClick={() => deleteTodo(id)} className="text-red-500 transition-all hover:text-red-700">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editing Fields */}
      {isEditing && (
        <div className="mt-3 flex flex-col space-y-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Edit task..."
          />
          <div className="flex space-x-2">
            <input
              type="date"
              value={newStartDate}
              onChange={(e) => setNewStartDate(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="date"
              value={newEndDate}
              onChange={(e) => setNewEndDate(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItems;
