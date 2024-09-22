const cloudinary = require('cloudinary').v2;
const fs = require('fs');

//setup the configuration of cloudinary
cloudinary.config({
    cloud_name: 'demoapi-0',
    api_key: '419847122881466',
    api_secret: 'yJJK8VOChQ02mGtupr2oGRNv4vg'
});

const uploadOnCloudinary = async (localFilePath) => {
    // console.log("localFilePath==============uploadOnCloudinary", localFilePath);

    try {
        if (!localFilePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // file has been uploaded successfull
        // After file upload remove the locally saved temporary file
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {

        console.error('Error uploading to Cloudinary:', error);

        // Remove the locally saved temporary file as the upload operation failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        }
        return null;
    }
}
module.exports = { uploadOnCloudinary }