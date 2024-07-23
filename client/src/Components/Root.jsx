import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskCol";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const initialTasks = {
  todo: [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      createdAt: "01/09/2024, 05:30:00",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      createdAt: "01/09/2024, 05:30:00",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      createdAt: "01/09/2024, 05:30:00",
    },
  ],
  inProgress: [
    {
      id: "4",
      title: "Task 4",
      description: "Description 4",
      createdAt: "01/09/2024, 05:30:00",
    },
    {
      id: "5",
      title: "Task 5",
      description: "Description 5",
      createdAt: "01/09/2024, 05:30:00",
    },
  ],
  done: [
    {
      id: "6",
      title: "Task 6",
      description: "Description 6",
      createdAt: "01/09/2021, 05:30:00",
    },
  ],
};

const Root = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];

    const sourceItems = Array.from(sourceColumn);
    const destItems = Array.from(destColumn);

    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceItems,
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 p-6">
     <Link to='/add-a-task'>
     <button className="mb-4 p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
     </Link> 

      <div className="flex w-full flex-row justify-between bg-blue-gray-700  ">
        <div className="flex  gap-x-2 sm:flex-row sm:items-center pl-6">
          <div className="relative w-full gap-2 md:w-max">
            <Input
              type="search"
              placeholder="Search"
              containerProps={{
                className: "min-w-[288px]",
              }}
              className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#CFD8DC"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#CFD8DC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <Button size="md" className="mt-1 rounded-lg sm:mt-0">
            Search
          </Button>
        </div>

        <div className="pr-6 flex-row">
          <Typography>SortBy: </Typography>
          <div>
            <button
              data-ripple-light="true"
              data-popover-target="menu"
              className="select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Open Menu
            </button>
            <ul
              role="menu"
              data-popover="menu"
              data-popover-placement="bottom"
              className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
            >
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                Menu Item 1
              </li>
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                Menu Item 2
              </li>
              <li
                role="menuitem"
                className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                Menu Item 3
              </li>
            </ul>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-full justify-between">
          <TaskColumn title="TODO" tasks={tasks.todo} droppableId="todo" />
          <TaskColumn
            title="IN PROGRESS"
            tasks={tasks.inProgress}
            droppableId="inProgress"
          />
          <TaskColumn title="DONE" tasks={tasks.done} droppableId="done" />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Root;
