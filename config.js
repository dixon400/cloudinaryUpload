require('dotenv').config;

exports.config = {
    PORT: process.env.port || 3210,
    cloudinary: {
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET 
	},
}