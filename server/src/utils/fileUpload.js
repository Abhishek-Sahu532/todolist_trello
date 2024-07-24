import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';

import fs from 'fs';
configDotenv({
	path: '../.env',
});
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
	
// console.log(process.env.CLOUD_NAME)
	try {
		if (!localFilePath) return null;

		// upload the file in cloudinary
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: 'auto',
		});
// console.log('response', response)
		// remove the local temporary file
		fs.unlinkSync(localFilePath);
		return response;
	} catch (error) {
		// remove the local saved temporally file as the upload operation got failed.
		fs.unlinkSync(localFilePath);
		return null;
	}
};

const deleteFromCloudinary = async (resourceUrl, inFolder, resourceType) => {
	const urlArray = resourceUrl.split('/');

	const resourcePublicId = inFolder
		? `${urlArray[urlArray.length - 2]}/${
				urlArray[urlArray.length - 1].split('.')[0]
		  }`
		: `${urlArray[urlArray.length - 1].split('.')[0]}`;

	const res = await cloudinary.uploader.destroy(resourcePublicId, {
		resource_type: resourceType ?? 'image',
	});

	return res.result?.toString().toLowerCase() === 'ok';
};

export { uploadOnCloudinary, deleteFromCloudinary };
