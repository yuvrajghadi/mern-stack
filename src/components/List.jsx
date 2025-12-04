import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [allTasks, setAllTasks] = useState([]);

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
      getTask();
      setMessage("✅ Task deleted successfully!");

      setTimeout(() => setMessage(""), 2000);
    }
  };

  const sellectAll = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
      let items = tasks.map((item) => item._id)
      setAllTasks(items)

    } else {
      setAllTasks([])
    }

  }
  
  const selectSingleItem = (id) => {
    console.log(id)
    if (allTasks.includes(id)) {
      let items = allTasks.filter((item) => item != id)
      setAllTasks(items)
    } else {
      setAllTasks(id, ...allTasks)
    }


  }

  console.log(allTasks)
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* ✅ Header Checkbox (UI only) */}
        <div className="flex items-center gap-3">
          <input
            onChange={sellectAll}
            type="checkbox"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <h1 className="text-3xl font-bold text-blue-700">📋 Your Tasks</h1>
        </div>

        <Link to="/add">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition active:scale-95">
            + Add Task
          </button>
        </Link>
      </div>

      {/* Status Message */}
      {message && (
        <p className="text-center text-sm font-medium text-green-600 mb-4">
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
                className="p-5 bg-gray-50 rounded-xl shadow flex flex-col gap-3 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition"
              >
                {/* ✅ Checkbox + Index + Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      onChange={() => selectSingleItem(item._id)}
                      checked={allTasks.includes(item._id)}
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />

                    <span className="text-xs font-bold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/update/${item._id}`}>
                      <button className="px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-md hover:bg-yellow-600 active:scale-95 transition">
                        Update
                      </button>
                    </Link>

                    <button
                      className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 transition"
                      onClick={() => handelBtn(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Task Title */}
                <div className="text-lg font-semibold text-blue-600">
                  {item.title}
                </div>

                {/* Description */}
                <div className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-16">
            🚫 No tasks found
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
