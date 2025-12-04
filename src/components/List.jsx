import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  const getTask = async () => {
    let res = await fetch("http://localhost:3200/tasks");
    res = await res.json();

    if (res.success) {
      setTasks(res.result);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const handelBtn = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this task?");
    if (!ok) return;

    let item = await fetch(`http://localhost:3200/delete/${id}`, {
      method: "DELETE",
    });

    item = await item.json();

    if (item.success) {
      getTask(); // 🔥 Refresh after delete
      setMessage("Task deleted successfully!");

      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
  <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold text-blue-700">📋 Your Tasks</h1>

      <Link to="/add">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition active:scale-95">
          Add Task
        </button>
      </Link>
    </div>

    {/* Status Message */}
    {message && (
      <p className="text-center text-sm font-medium text-green-600 mb-3">
        {message}
      </p>
    )}

    {/* Scrollable List */}
    <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 pr-2">
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((item, index) => (
            <li
              key={item._id}
              className="p-4 bg-gray-50 rounded-lg shadow flex flex-col gap-2 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition"
            >
              {/* Index + Buttons */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">
                  #{index + 1}
                </span>

                <div className="flex gap-2">
                  <Link to={`/update/${item._id}`}>
                    <button className="px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-md hover:bg-yellow-600 active:scale-95 transition cursor-pointer">
                      Update
                    </button>
                  </Link>

                  <button
                    className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 transition cursor-pointer"
                    onClick={() => handelBtn(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Task Title */}
              <div className="text-xl font-semibold text-blue-600">
                {item.title}
              </div>

              {/* Description */}
              <div className="text-gray-700 text-sm">
                {item.description}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-10">No tasks found</p>
      )}
    </div>
  </div>
);

};

export default List;
