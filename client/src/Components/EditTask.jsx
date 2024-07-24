import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import {
  editATaskRequest,
  editATaskSuccess,
  editATaskFailure,
} from "../Reducers/taskSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { extractErrorMessage } from "../extractMsg.js";

function EditTask({ title, description, taskId }) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);


  const handleOpen = () => setOpen(!open);

const handleEditClick= async()=>{
try{
  dispatch(editATaskRequest());
  const config = { headers: { "Content-Type": "application/json" } };
  const res = await axios.put(`/api/v1/tasks/edit-task/${taskId}`, {editTitle, editDescription}, config);
  // console.log(res.data)
  dispatch(editATaskSuccess(res.data));
  setOpen(close)
  toast.success('Task edit successfully')
}catch(error){
      // console.log("err", error);
      let htmlError = extractErrorMessage(error.response?.data);
      dispatch(editATaskFailure(htmlError || error.message));
      toast.error(htmlError);
}
}


  return (
    <>
      <Button color="green" size="sm" variant="outlined" className="flex items-center gap-2" onClick={handleOpen}>Edit</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Task </DialogHeader>
        <DialogBody className="gap-2">
          <Input
            label="Title"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />{" "}
          <br />
          <Textarea
            label="Description"
            value={editDescription}
            onChange={(e) => {
              setEditDescription(e.target.value);
            }}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={handleEditClick} variant="gradient" color="green" >
            <span>Edit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditTask;
