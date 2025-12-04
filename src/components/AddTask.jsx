import React, { useState } from "react";

const AddTask = () => {
  const [textData, setTextData] = useState({
    title: "",
    description: "",
  });

  const [successMsg, setSuccessMsg] = useState(""); // ⭐ NEW

  const handleTexxtData = async () => {
    // validation
    if (!textData.title.trim() || !textData.description.trim()) {
      alert("Please enter both title and description");
      return;
    }

    let res = await fetch("http://localhost:3200/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textData),
    });

    const msg = await res.text();
    console.log("Server says:", msg);

    if (res.ok) {
      // ⭐ Show message
      setSuccessMsg("Task Added Successfully!");

      // reset input fields
      setTextData({ title: "", description: "" });

      // ⭐ Hide msg after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col space-y-4">
      <h1 className="text-2xl font-semibold text-blue-600 text-center">
        Add Task
      </h1>

      <input
        type="text"
        name="title"
        value={textData.title}
        onChange={(e) => setTextData({ ...textData, title: e.target.value })}
        placeholder="Enter task title"
        className="w-96 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="description"
        value={textData.description}
        onChange={(e) =>
          setTextData({ ...textData, description: e.target.value })
        }
        placeholder="Enter task description"
        rows="5"
        className="w-96 p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      <button
        type="button"
        onClick={handleTexxtData}
        className="w-96 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
      >
        Add Task
      </button>

      {/* ⭐ Success Message */}
      {successMsg && (
        <p className="text-green-600 font-semibold mt-2">{successMsg}</p>
      )}
    </div>
  );
};

export default AddTask;
