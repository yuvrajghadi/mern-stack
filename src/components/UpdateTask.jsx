import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const [textData, setTextData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) getTask(id);
  }, [id]);

  const getTask = async (id) => {
    let res = await fetch(
      `https://todo-backend-rosy.vercel.app/task/${id}`,
      {
        credentials: "include", // ✅ REQUIRED
      }
    );

    let data = await res.json();

    if (data.success) {
      setTextData(data.result);
    }
  };

  const updateTask = async () => {
    let res = await fetch(
      `https://todo-backend-rosy.vercel.app/update-task`,
      {
        method: "PUT",
        credentials: "include", // ✅ REQUIRED
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,                 // ✅ REQUIRED
          title: textData.title,
          description: textData.description,
        }),
      }
    );

    let data = await res.json();

    if (data.success) {
      navigate("/");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col space-y-4">
      <h1 className="text-2xl font-semibold text-blue-600 text-center">
        Update Task
      </h1>

      <input
        type="text"
        value={textData.title}
        onChange={(e) =>
          setTextData({ ...textData, title: e.target.value })
        }
        placeholder="Enter task title"
        className="w-96 p-3 border rounded-md"
      />

      <textarea
        value={textData.description}
        onChange={(e) =>
          setTextData({ ...textData, description: e.target.value })
        }
        placeholder="Enter task description"
        rows="5"
        className="w-96 p-3 border rounded-md"
      />

      <button
        onClick={updateTask}
        className="w-96 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
      >
        Update Task
      </button>
    </div>
  );
};

export default UpdateTask;
