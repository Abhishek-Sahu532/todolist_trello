import { Typography, Input, Button, Textarea } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { api } from "../api";
import {
  addATaskRequest,
  addATaskSuccess,
  addATaskFailure,
} from "../Reducers/userSlice.js";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("title", data.title);
    myForm.set("description", data.description);
    myForm.set("taskimage", data.taskimage[0]);
    // dispatch(registerUser(myForm));
    dispatch(addATaskRequest());
    try {
      const response = await api.post("/tasks/add-a-task", myForm);

      dispatch(addATaskSuccess(response.data));
    } catch (error) {
      dispatch(addATaskFailure(error.response?.data?.message || error.message));
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8 mb-6">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Add a Task
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Fill the required details to add a task
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <Input
              variant="static"
              label="Title"
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
                minLength: "5",
                maxLength: "20",
              })}
            />
            {errors.title && (
              <p className="my-2 text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-6">
            <div className="relative w-full min-w-[200px]">
              <Textarea
                variant="static"
                label="Description"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                  minLength: "5",
                  maxLength: "60",
                })}
              />
              {errors.description && (
                <p className="my-2 text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              className="block w-full border peer border-secondarybg  shadow-sm rounded-lg text-sm focus:border-2 focus:border-secondarybg focus:border-t-transparent focus:!border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 disabled:opacity-50 disabled:pointer-events-none  file:border-0 file:me-4 file:py-3 file:px-4  dark:file:bg-neutral-700 dark:file:text-neutral-400"
              {...register("taskimage", {
                required: "Image is required",
              })}
            />
            {errors.taskimage && (
              <p className="my-2 text-red-600">{errors.taskimage.message}</p>
            )}
          </div>
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Choose a file to detail to the task
          </Typography>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            Add
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddTask;
