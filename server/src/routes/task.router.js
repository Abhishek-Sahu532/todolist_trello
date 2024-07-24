import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createATask,
  editUserTask,
  deleteUserTask,getTasks, updateTaskStatus
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
router.route('/tasks').get(verifyJWT, getTasks)
router.route('/tasks/:taskId').patch(verifyJWT, updateTaskStatus)
router
  .route("/edit-task/:taskId")
  .put(verifyJWT, editUserTask)

  router
  .route("/delete-task/:taskId").delete(verifyJWT, deleteUserTask);

export default router;
