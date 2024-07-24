import React from "react";
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function ViewTask({ title, description, createdAt, image }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        color="blue"
        size="sm"
        variant="outlined"
        className="flex items-center gap-2"
        onClick={handleOpen}
      >
        View
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Card>
          <CardBody>
            <div className="flex justify-between">
              <img
                className=" object-cover object-center mb-4 h-16 w-16 rounded-full"
                src={image}
                alt={title}
              />
              <Typography className="text-xs">{createdAt}</Typography>
            </div>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {title}
            </Typography>
            <Typography>{description}</Typography>
          </CardBody>
          <CardFooter className="pt-0 flex gap-2  items-center">
            <Button
              color="red"
              size="sm"
              variant="outlined"
              className="flex items-center gap-2"
              onClick={handleOpen}
              
            >
              <span>Cancel</span>
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default ViewTask;
