import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
  const [textData, setTextData] = useState({
    title: "",
    description: ""
  });

  const { id } = useParams();

  useEffect(() => {
    getTask(id);
  }, []);

  const getTask = async (id) => {
    let res = await fetch(`http://localhost:3200/task/${id}`);
    res = await res.json();

    if (res.success) {
      setTextData(res.result);
    }
  };


    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col space-y-4">
      <h1 className="text-2xl font-semibold text-blue-600 text-center">
        Update Task
      </h1>

      <input
        type="text"
        name="title"
        value={textData.title}
        onChange={(e) =>
          setTextData({ ...textData, title: e.target.value })
        }
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
       
        className="w-96 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
      >
        Update Task
      </button>
    </div>
  );
};

export default UpdateTask;
