import React from "react";
import { type Task, TaskStatus } from "../types";
import { STATUS_COLORS, STATUS_TEXT_COLORS } from "../constants";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMarkComplete: (id: string) => void;
  onMarkInProgress: (id: string) => void;
  onMarkPending: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onMarkComplete,
  onMarkInProgress,
  onMarkPending,
}) => {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="relative bg-white p-4 mb-3 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full border-2 border-blue-800 flex items-center justify-center text-blue-800 font-bold text-xs">
            {task.title.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <h3
              className={`font-semibold text-gray-800 truncate ${
                task.status === TaskStatus.COMPLETED
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {task.title}
            </h3>
            <div className="flex items-center gap-1.5 ml-2">
              <span
                className={`w-2 h-2 rounded-full ${STATUS_COLORS[task.status]}`}
              />
              <span
                className={`text-[10px] font-medium whitespace-nowrap ${
                  STATUS_TEXT_COLORS[task.status]
                }`}
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

      {/* Hover Actions */}
      <div className="absolute bottom-3 right-3 flex flex-wrap gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        {/* Status transitions */}

        {/* Pending → In Progress */}
        {task.status === TaskStatus.PENDING && (
          <button
            onClick={(e) => {
              stop(e);
              onMarkInProgress(task.id);
            }}
            className="p-1.5 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition-colors"
            title="Move to in progress"
          >
            ▶
          </button>
        )}

        {/* In Progress → Completed */}
        {task.status === TaskStatus.IN_PROGRESS && (
          <button
            onClick={(e) => {
              stop(e);
              onMarkComplete(task.id);
            }}
            className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
            title="Mark as completed"
          >
            ✓
          </button>
        )}

        {/* In Progress → Pending */}
        {task.status === TaskStatus.IN_PROGRESS && (
          <button
            onClick={(e) => {
              stop(e);
              onMarkPending(task.id);
            }}
            className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
            title="Move to pending"
          >
            ↺
          </button>
        )}

        {/* Completed → In Progress */}
        {task.status === TaskStatus.COMPLETED && (
          <button
            onClick={(e) => {
              stop(e);
              onMarkInProgress(task.id);
            }}
            className="p-1.5 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition-colors"
            title="Reopen as in progress"
          >
            ↻
          </button>
        )}

        {/* Completed → Pending */}
        {task.status === TaskStatus.COMPLETED && (
          <button
            onClick={(e) => {
              stop(e);
              onMarkPending(task.id);
            }}
            className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
            title="Move back to pending"
          >
            ⏸
          </button>
        )}

        {/* Edit */}
        {task.status !== TaskStatus.COMPLETED && (
          <button
            onClick={(e) => {
              stop(e);
              onEdit(task);
            }}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
            title="Edit task"
          >
            ✎
          </button>
        )}

        {/* Delete */}
        <button
          onClick={(e) => {
            stop(e);
            onDelete(task.id);
          }}
          className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
          title="Delete task"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
