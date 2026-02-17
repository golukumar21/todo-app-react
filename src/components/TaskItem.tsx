import React, { useState } from "react";
import { type Task, TaskStatus } from "../types";
import { STATUS_COLORS, STATUS_TEXT_COLORS } from "../constants";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMarkComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onMarkComplete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white p-4 mb-3 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full border-2 border-blue-800 flex items-center justify-center text-blue-800 font-bold text-xs">
            {task.title.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <h3
              className={`font-semibold text-gray-800 truncate ${task.status === TaskStatus.COMPLETED ? "line-through text-gray-400" : ""}`}
            >
              {task.title}
            </h3>
            <div className="flex items-center gap-1.5 ml-2">
              <span
                className={`w-2 h-2 rounded-full ${STATUS_COLORS[task.status]}`}
              ></span>
              <span
                className={`text-[10px] font-medium whitespace-nowrap ${STATUS_TEXT_COLORS[task.status]}`}
              >
                {task.status}
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-1 line-clamp-2">
            {task.description}
          </p>

          <div className="text-[10px] text-gray-400 mt-2 font-medium">
            {new Date(task.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Hover Actions: Mark as complete, Edit task, Delete task */}
      <div
        className={`absolute bottom-3 right-3 flex gap-2 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {/* Mark as complete */}
        {task.status !== TaskStatus.COMPLETED &&
          task.status !== TaskStatus.PENDING && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkComplete(task.id);
              }}
              className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
              title="Mark as complete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          )}
        {/* Edit task*/}
        {task.status !== TaskStatus.COMPLETED && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
            title="Edit task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        )}
        {/* Delete task */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
          title="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
