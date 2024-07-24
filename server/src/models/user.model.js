import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		lastName: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		avatar: {
			type: String, // cloudnery URL
			required: true,
			default:
				'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true },
);


//encryp the password before creating the user
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});


//to check , when the user trying to login
userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	console.log(process.env.ACCESS_TOKEN_SECRET)
	return jwt.sign(
	  {
		_id: this._id,
		email: this.email,
		username: this.username,
		fullname: this.fullname,
	  },
	  process.env.ACCESS_TOKEN_SECRET,
	  {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
	  }
	);
  };


userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		},
	);
};

export const User = mongoose.model('User', userSchema);
