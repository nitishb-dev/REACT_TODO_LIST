import { FaTrash, FaCheckCircle, FaRegCircle, FaEdit, FaSave } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime, startDate, endDate, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleSave = () => {
    if (!newText.trim()) {
      setError("Task name cannot be empty.");
      return;
    }
    if (!newStartDate || !newEndDate) {
      setError("Start and End dates are required.");
      return;
    }
    if (new Date(newStartDate) > new Date(newEndDate)) {
      setError("Start date cannot be later than End date.");
      return;
    }

    editTodo(id, newText, newStartDate, newEndDate);
    setIsEditing(false);
    setError("");
  };

  return (
    <div className="flex flex-col bg-gray-100 p-3 rounded-lg mt-3 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div onClick={() => toggle(id)} className="flex items-center cursor-pointer">
          {isComplete ? <FaCheckCircle className="text-green-500 text-xl" /> : <FaRegCircle className="text-gray-400 text-xl" />}
          
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
      
      {isEditing && (
        <div className="flex flex-col mt-2 ml-8">
          <label className="text-sm text-gray-600">Start Date:</label>
          <input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} className="border p-1 rounded" />
          <label className="text-sm text-gray-600 mt-1">End Date:</label>
          <input type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} className="border p-1 rounded" />
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm mt-1 ml-8">⚠ {error}</p>}
      
      <p className="text-gray-500 text-sm mt-1 ml-8">
        📅 Start: {startDate} | ⏳ End: {endDate}
      </p>
      
      <p className="text-gray-500 text-sm mt-1 ml-8">
        {isComplete ? `✅ Completed on: ${completedTime}` : `🕒 Added on: ${timeAdded}`}
      </p>
    </div>
  );
};

export default TodoItems;