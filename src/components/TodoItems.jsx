import { FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, timeAdded, completedTime }) => {
  return (
    <div className="flex flex-col bg-gray-100 p-3 rounded-lg mt-3 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div onClick={() => toggle(id)} className="flex items-center cursor-pointer">
          {isComplete ? (
            <FaCheckCircle className="text-green-500 text-xl" />
          ) : (
            <FaRegCircle className="text-gray-400 text-xl" />
          )}
          <p
            className={`ml-3 text-lg ${
              isComplete ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {text}
          </p>
        </div>
        <button onClick={() => deleteTodo(id)} className="text-red-500 cursor-pointer">
          <FaTrash />
        </button>
      </div>
      <p className="text-gray-500 text-sm mt-1 ml-8">
        {isComplete ? `✅ Completed on: ${completedTime}` : `📅 Added on: ${timeAdded}`}
      </p>
    </div>
  );
};

export default TodoItems;

