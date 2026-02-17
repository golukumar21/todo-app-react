import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/header";
import {
  TaskStatus,
  type Task,
  type ViewMode,
  type FilterStatus,
} from "./types";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [title] = useState("TO-DO APP");
  const [viewMode, setViewMode] = useState<ViewMode>("LIST");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>(() => {
    const savedFilter = localStorage.getItem("tasks_filter");
    return (savedFilter as FilterStatus) || "ALL";
  });
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    [TaskStatus.IN_PROGRESS]: true,
    [TaskStatus.PENDING]: true,
    [TaskStatus.COMPLETED]: true,
  });

  // Loading Tasks from Local Storage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem("todotasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Created Tasks to Local Storage
  useEffect(() => {
    localStorage.setItem("todotasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [tasks, searchQuery]);

  useEffect(() => {
    localStorage.setItem("tasks_filter", statusFilter);
  }, [statusFilter]);

  const displayedStatuses = useMemo(() => {
    switch (statusFilter) {
      case "COMPLETED":
        return [TaskStatus.COMPLETED];
      case "INCOMPLETE":
        return [TaskStatus.IN_PROGRESS, TaskStatus.PENDING];
      default:
        return [
          TaskStatus.IN_PROGRESS,
          TaskStatus.PENDING,
          TaskStatus.COMPLETED,
        ];
    }
  }, [statusFilter]);

  const categorizedTasks = useMemo(() => {
    const categories: Record<TaskStatus, Task[]> = {
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.PENDING]: [],
      [TaskStatus.COMPLETED]: [],
    };
    filteredTasks.forEach((t) => categories[t.status].push(t));
    return categories;
  }, [filteredTasks]);

  const addTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title || "",
      description: taskData.description || "",
      status: taskData.status || TaskStatus.PENDING,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setViewMode("LIST");
  };

  const updateTask = (taskData: Partial<Task>) => {
    if (!editingTask) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t)),
    );
    setEditingTask(null);
    setViewMode("LIST");
  };

  const deleteTask = (id: string) => {
    setDeleteId(id);
  };

  const markComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === TaskStatus.COMPLETED
                  ? TaskStatus.PENDING
                  : TaskStatus.COMPLETED,
            }
          : task,
      ),
    );
  };

  const confirmDelete = () => {
    if (!deleteId) return;

    setTasks((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  const toggleSection = (status: TaskStatus) => {
    setExpandedSections((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  if (viewMode === "ADD") {
    return (
      <div className="min-h-screen bg-white">
        <TaskForm
          onSave={addTask}
          onCancel={() => setViewMode("LIST")}
          initialTask={null}
        />
      </div>
    );
  }

  if (viewMode === "EDIT" && editingTask) {
    return (
      <div className="min-h-screen bg-white">
        <TaskForm
          onSave={updateTask}
          onCancel={() => {
            setViewMode("LIST");
            setEditingTask(null);
          }}
          initialTask={editingTask}
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-50 mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
        {/* Header */}
        <Header title={title} />
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {/* Search Bar */}
          <div className="p-4 pb-0">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search To-Do"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-4 py-4 flex gap-2">
            {(["ALL", "INCOMPLETE", "COMPLETED"] as FilterStatus[]).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`flex-1 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all border ${
                  statusFilter === f
                    ? "bg-[#004aad] text-white border-[#004aad] shadow-md"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="px-4 pb-24">
            {displayedStatuses.map((status) => (
              <div
                key={status}
                className="mb-4 animate-in fade-in duration-500"
              >
                <button
                  onClick={() => toggleSection(status)}
                  className="w-full flex items-center justify-between py-2 px-1 border-b border-gray-200 focus:outline-none group"
                >
                  <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
                    {status}{" "}
                    <span className="text-gray-400 font-medium">
                      ({categorizedTasks[status].length})
                    </span>
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-gray-400 transition-transform ${expandedSections[status] ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {expandedSections[status] && (
                  <div className="mt-3 space-y-1">
                    {categorizedTasks[status].length === 0 ? (
                      <p className="text-gray-400 text-[11px] italic text-center py-4">
                        No tasks found
                      </p>
                    ) : (
                      categorizedTasks[status].map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onEdit={(t) => {
                            setEditingTask(t);
                            setViewMode("EDIT");
                          }}
                          onDelete={deleteTask}
                          onMarkComplete={markComplete}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Action Button */}
        <button
          onClick={() => setViewMode("ADD")}
          className="absolute bottom-6 right-6 w-14 h-14 bg-[#004aad] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-900 transition-all hover:scale-110 active:scale-95 z-20 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 transition-transform group-hover:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <ConfirmModal
          open={!!deleteId}
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      </div>
    </>
  );
}

export default App;
