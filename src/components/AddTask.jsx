import React, { useState } from "react";

const AddTask = () => {
  const [textData, setTextData] = useState({
    title: "",
    description: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false); // ✅ prevent double submit

  const handleTexxtData = async () => {
    // ✅ Validation
    if (!textData.title.trim() || !textData.description.trim()) {
      alert("Please enter both title and description");
      return;
    }

    try {
      setLoading(true);

      let res = await fetch(
        "https://todo-backend-rosy.vercel.app/add-task",
        {
          method: "POST",
          credentials: "include", // ✅ REQUIRED
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(textData),
        }
      );

      let data = await res.json(); // ✅ Proper JSON handling

      if (data.success) {
        setSuccessMsg("✅ Task Added Successfully!");
        setTextData({ title: "", description: "" });

        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        alert("Failed to add task");
      }
    } catch (error) {
      console.error("Add Task Error:", error);
      alert("Server error while adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col space-y-4">
      <h1 className="text-2xl font-semibold text-blue-600 text-center">
        Add Task
      </h1>

      <input
        type="text"
        value={textData.title}
        onChange={(e) =>
          setTextData({ ...textData, title: e.target.value })
        }
        placeholder="Enter task title"
        className="w-96 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        value={textData.description}
        onChange={(e) =>
          setTextData({ ...textData, description: e.target.value })
        }
        placeholder="Enter task description"
        rows="5"
        className="w-96 p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      <button
        onClick={handleTexxtData}
        disabled={loading}
        className={`w-96 py-2 rounded-md transition text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : "Add Task"}
      </button>

      {/* ✅ Success Message */}
      {successMsg && (
        <p className="text-green-600 font-semibold mt-2">
          {successMsg}
        </p>
      )}
    </div>
  );
};

export default AddTask;
