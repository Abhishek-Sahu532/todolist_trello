import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskCol";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  getTasksRequest,
  getTasksSuccess,
  getTasksFailure,
} from "../Reducers/taskSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { extractErrorMessage } from "../extractMsg.js";

const Root = () => {
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // console.log(tasks)
  const getTasks = async () => {
    try {
      dispatch(getTasksRequest());
      const res = await axios.get("/api/v1/tasks/tasks");
      // console.log(res.data.data)
      const taskData = res.data.data.reduce(
        (acc, task) => {
          // console.log(task.processTitle)
          acc[task.processTitle].push(task);
          return acc;
        },
        { todo: [], inProgress: [], done: [] }
      );
      setTasks(taskData);
      dispatch(getTasksSuccess(taskData));
      // console.log(res.data);
    } catch (error) {
      // console.log('err', error);
      let htmlError = extractErrorMessage(error.response?.data);
      dispatch(getTasksFailure(htmlError || error.message));
      toast.error(htmlError);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      console.log(taskId, newStatus);
      await axios.patch(`/api/v1/tasks/tasks/${taskId}`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error("Failed to update task status.");
    }
  };

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
      updateTaskStatus(removed._id, destination.droppableId);
    }
  };

  return (
    <div className="flex flex-col items-center  p-6">
      <Link to="/add-a-task" className="m-1 p-6 w-full flex justify-end">
        <Button color="blue" size="sm" variant="gradient">
          Add Task
        </Button>
      </Link>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-full justify-between ">
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
