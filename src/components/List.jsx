import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [allTasks, setAllTasks] = useState([]);

 const getTask = async () => {
  let res = await fetch("http://localhost:3200/tasks", {
    credentials: "include",
  });
  res = await res.json();

  if (res.message) {
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
      credentials: "include",
    });

    item = await item.json();

    if (item.success) {
      getTask();
      setMessage("✅ Task deleted successfully!");

      setTimeout(() => setMessage(""), 2000);
    }else{
      alert("Failed to delete the task.")
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
      let items = allTasks.filter((item) => item !== id)
      setAllTasks({ items })
    } else {
      setAllTasks([id, ...allTasks])
    }

  }

  const deleteMultiple = async () => {
    const ok = window.confirm("Are you sure you want to delete this task?");
    if (!ok) return;

    let item = await fetch('http://localhost:3200/delete-multiple/', {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify(allTasks),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    item = await item.json();

    if (item.success) {
      getTask();
      setMessage("✅ Task deleted successfully!");

      setTimeout(() => setMessage(""), 2000);
    }else{
      alert("Failed to delete the task.")
    }
  };



  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">

      {/* ✅ Header */}
      <div className="flex items-center justify-between mb-6">

        {/* ✅ Left: Bulk Delete Button */}
        <button
          onClick={deleteMultiple}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition active:scale-95 shadow"
        >
          🗑 Delete Selected
        </button>

        {/* ✅ Middle: Select All + Title */}
        <div className="flex items-center gap-3">
          <input
            onChange={sellectAll}
            type="checkbox"
            className="w-5 h-5 accent-blue-600 cursor-pointer"
          />
          <h1 className="text-3xl font-bold text-blue-700 tracking-wide">
            📋 Your Tasks
          </h1>
        </div>

        {/* ✅ Right: Add Task */}
        <Link to="/add">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition active:scale-95 shadow">
            + Add Task
          </button>
        </Link>
      </div>

      {/* ✅ Status Message */}
      {message && (
        <p className="text-center text-sm font-medium text-green-600 mb-4">
          {message}
        </p>
      )}

      {/* ✅ Scrollable List */}
      <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-100 pr-2">
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((item, index) => (
              <li
                key={item._id}
                className="p-5 bg-gray-50 rounded-xl shadow flex flex-col gap-3 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                {/* ✅ Checkbox + Index + Buttons */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <input
                      onChange={() => selectSingleItem(item._id)}
                      checked={allTasks.includes(item._id)}
                      type="checkbox"
                      className="w-5 h-5 accent-blue-600 cursor-pointer"
                    />

                    <span className="text-xs font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded-full shadow-sm">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/update/${item._id}`}>
                      <button className="px-3 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-md hover:bg-yellow-600 active:scale-95 transition shadow">
                        Update
                      </button>
                    </Link>

                    <button
                      className="px-3 py-1 text-xs font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 transition shadow"
                      onClick={() => handelBtn(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* ✅ Task Title */}
                <div className="text-lg font-semibold text-blue-700">
                  {item.title}
                </div>

                {/* ✅ Description */}
                <div className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-16 text-lg">
            🚫 No tasks found
          </p>
        )}
      </div>
    </div>
  );

};

export default List;
