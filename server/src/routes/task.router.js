import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createATask } from '../controllers/task.controller.js';



const router = Router();

router.route('/add-a-task').post(verifyJWT,upload.fields([
    {
        name: 'taskimage',
        maxCount: 1,
    },
]), createATask);




export default router;
