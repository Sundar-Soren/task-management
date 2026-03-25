import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  const user = token ? jwtDecode(token) : null;
  const nav = useNavigate();

  const loadTasks = async () => {
    const res = await API.get("/tasks");

    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    try {
      if (!title.trim()) {
        toast.error("Task cannot be empty");

        return;
      }
      await API.post("/tasks", { title });

      toast.success("Task added");

      setTitle("");

      loadTasks();
    } catch (err) {
      console.log("err", err);
      toast.error(err.response?.data?.message);
    }
  };

  const updateTask = async (id) => {
    try {
      await API.put(
        `/tasks/${id}`,

        { title: editText },
      );

      toast.success("updated");

      setEditingId(null);

      loadTasks();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      if (!confirm("Delete task?")) return;
      await API.delete(`/tasks/${id}`);

      toast.success("Deleted");

      loadTasks();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Task Manager</h2>

        <div className="role">
          Role: {user?.role} | Tasks: {tasks.length}
        </div>

        <input
          placeholder="new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>add task</button>

        <hr />
        <div className="task_container">
          {tasks.length === 0 && (
            <p style={{ opacity: 0.6 }}>No tasks yet. Add your first task 🚀</p>
          )}
          {tasks.map((t) => {
            const canEdit = user?.role === "admin" || t.createdBy === user?.id;
            return (
              <div className="task" key={t._id}>
                {/* edit mode */}
                {editingId === t._id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button
                      className="delete"
                      onClick={() => updateTask(t._id)}
                    >
                      save
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      {t.title}

                      {user?.role === "admin" && (
                        <div
                          style={{
                            fontSize: "12px",
                            opacity: 0.7,
                          }}
                        >
                          by {t.createdBy?.email}
                        </div>
                      )}
                    </span>
                    <div className="action_button">
                      {canEdit && (
                        <button
                          className="delete"
                          onClick={() => {
                            setEditingId(t._id);

                            setEditText(t.title);
                          }}
                        >
                          edit
                        </button>
                      )}
                      {user?.role === "admin" && (
                        <button
                          className="delete"
                          onClick={() => deleteTask(t._id)}
                        >
                          delete
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button
          style={{
            background: "red",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            nav("/login");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
}
