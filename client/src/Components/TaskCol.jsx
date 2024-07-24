import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, droppableId }) => {
  return (
    <div className="w-1/3 p-2 ">
      <h2 className="text-xl font-bold mb-2 text-center">{title}</h2>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className=" bg-gray-200 p-4 rounded min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task._id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
               
                  >
                    {/* {task.title} */}
                    <TaskCard task={task} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
