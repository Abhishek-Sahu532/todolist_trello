import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, droppableId }) => {
  return (
    <div className="w-1/3 p-2">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-gray-200 p-4 rounded min-h-[200px]"
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
