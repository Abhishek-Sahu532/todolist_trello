import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createATask,
  editUserTask,
  deleteUserTask,
} from "../controllers/task.controller.js";

const router = Router();

router.route("/add-a-task").post(
  verifyJWT,
  upload.fields([
    {
      name: "taskimage",
      maxCount: 1,
    },
  ]),
  createATask
);

router
  .route("/edit-task/:taskId")
  .put(verifyJWT, editUserTask)
  .delete(verifyJWT, deleteUserTask);

export default router;
