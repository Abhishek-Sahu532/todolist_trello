import React from "react";
import { Draggable } from "react-beautiful-dnd";
import EditTask from "./EditTask";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded shadow mb-4"
        >
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Created at: {task.createdAt}</p>
          <div className="mt-2 flex space-x-2">
            <button className="p-1 bg-red-500 text-white rounded">
              Delete
            </button>
           
            <EditTask  />
            <button className="p-1 bg-blue-500 text-white rounded">
              View Details
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
