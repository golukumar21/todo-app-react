import React, { useEffect, useRef, useState } from "react";
import { type Task, TaskStatus } from "../types";

interface TaskFormProps {
  initialTask: Task | null;
  onSave: (task: Partial<Task>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || "",
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialTask?.status || TaskStatus.PENDING,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description, status });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Custom Header */}
      <div className="bg-[#004aad] text-white p-4 flex items-center shadow-lg">
        <button
          onClick={onCancel}
          className="mr-4 hover:bg-blue-700 p-1 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold">
          {initialTask ? "Edit Task" : "Add Task"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 max-w-2xl mx-auto w-full"
      >
        <div>
          <input
            type="text"
            placeholder="Enter the title"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <textarea
            placeholder="Enter the description"
            className="w-full px-4 py-3 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {initialTask && (
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-300 rounded flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${status === TaskStatus.PENDING ? "bg-gray-400" : status === TaskStatus.IN_PROGRESS ? "bg-orange-500" : "bg-green-500"}`}
                ></span>
                <span>{status}</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
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

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {Object.values(TaskStatus).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStatus(s);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-sm border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${s === TaskStatus.PENDING ? "bg-gray-400" : s === TaskStatus.IN_PROGRESS ? "bg-orange-500" : "bg-green-500"}`}
                    ></span>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 border border-blue-800 text-blue-800 font-semibold rounded hover:bg-blue-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-[#004aad] text-white font-semibold rounded hover:bg-blue-900 transition-colors shadow-md active:transform active:scale-95"
          >
            {initialTask ? "UPDATE" : "ADD"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
