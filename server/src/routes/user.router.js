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
import { body, validationResult } from 'express-validator';

const router = Router();

// Validation Middleware
const validateUpdatePassword = [
	body('oldPassword').notEmpty().withMessage('Old password is required.'),
	body('newPassword').notEmpty().withMessage('New password is required.'),
	body('confirmPassword')
		.notEmpty()
		.withMessage('Confirm password is required.'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];



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
