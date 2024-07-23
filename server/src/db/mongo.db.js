import mongoose from 'mongoose';

export const dbConnection = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.MONGODB_URI}`,
		);
		console.log(
			`DB connection is established  : ${connectionInstance.connection.host}`,
		);
	} catch (error) {
		console.log('Warning : DB is not connected', error);
		process.exit();
	}
};
