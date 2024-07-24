import React from "react";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const TaskCard = ({ task, index }) => {

  function formatTimeDifference(timestamp) {
		const currentDate = new Date();
		const targetDate = new Date(timestamp);

		// Calculate the difference in milliseconds
		const timeDifference = currentDate - targetDate;
		const secondsDifference = Math.floor(timeDifference / 1000);
		const minutesDifference = Math.floor(secondsDifference / 60);
		const hoursDifference = Math.floor(minutesDifference / 60);
		const daysDifference = Math.floor(hoursDifference / 24);

		if (daysDifference > 0) {
			return `${formatTwoDigits(targetDate.getDate())} ${getMonthAbbreviation(
				targetDate.getMonth(),
			)} ${formatTwoDigits(targetDate.getFullYear() % 100)}`;
		} else if (hoursDifference > 0) {
			return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
		} else if (minutesDifference > 0) {
			return `${minutesDifference} min${minutesDifference > 1 ? 's' : ''} ago`;
		} else {
			return 'now';
		}
	}

	function getMonthAbbreviation(monthIndex) {
		const monthAbbreviations = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		return monthAbbreviations[monthIndex];
	}

	function formatTwoDigits(value) {
		return value < 10 ? '0' + value : value;
	}

	// Output: "2 minutes ago" or "now" or "14 Feb 24"
	const numDate = task.createdAt;

	const formattedTime = formatTimeDifference(numDate);


  // console.log(task._id)
  return (
    <>
      <Card className="mt-6 w-96" index={index}>
        <CardBody>
          {task ? (
            <img
              className=" object-cover object-center mb-4 h-16 w-16 rounded-full"
              src={task && task.taskImage}
              alt={task && task.title}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mb-4 h-12 w-12 text-gray-900"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>
          )}

          <Typography variant="h5" color="blue-gray" className="mb-2">
            {task.title}
          </Typography>
          <Typography>{task.description}</Typography>
          <Typography className="text-xs">{formattedTime}</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex gap-2  items-center">
          <ViewTask
            title={task.title}
            description={task.description}
            createdAt={formattedTime}
            image={task.taskImage}
          />
          <EditTask title={task.title} description={task.description} />
          <Button
            color="red"
            size="sm"
            variant="outlined"
            className="flex items-center gap-2"
          >
            delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskCard;
