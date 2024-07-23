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

function EditTask({ title, description }) {
  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Edit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditTask;
