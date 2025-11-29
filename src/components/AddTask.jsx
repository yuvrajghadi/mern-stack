import React, { useState } from "react";

const AddTask = () => {
  const [textData, setTextData] = useState('');

  const handleTexxtData = async () => {
    console.log(textData);
    let res = await fetch("http://localhost:3200/add-task", {
      method: "post",
      body: JSON.stringify(textData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const msg = await res.text();

    console.log("Server says:", msg);

  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col space-y-4">
      <h1 className="text-2xl font-semibold text-blue-600 text-center">Add Task</h1>

      <input
        type="text"
        name="title"
        onChange={(e) => setTextData({ ...textData, title: e.target.value })}
        placeholder="Enter task title"
        className="w-96 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="description"
        onChange={(e) => setTextData({ ...textData, description: e.target.value })}
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
    </div>
  );
};

export default AddTask;
