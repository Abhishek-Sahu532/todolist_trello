import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
	registerUser,
	signinUser,
	signoutUser,
	refreshAccessToken,
	getCurrentUser,
	googleAuth,
} from '../controllers/user.controller.js';

const router = Router();


router.route('/signup').post(
	upload.fields([
		{
			name: 'avatar',
			maxCount: 1,
		},
	]),
	registerUser,
);
router.route('/google').post(googleAuth);
router.route('/signin').post(signinUser, refreshAccessToken);



//secured routes
router.route('/signout').post(verifyJWT, signoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/user').get(verifyJWT, getCurrentUser);


export default router;
