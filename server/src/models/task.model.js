import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		processTitle: {
			type: String,
			required: true,
			default: 'todo',
		},
		taskImage: {
			type: String, // cloudnery URL
			required: true,
			default:
				'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true },
);

export const Task = mongoose.model('Task', taskSchema);
