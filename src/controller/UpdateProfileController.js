const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const updateProfileController = async (req, res) => {

    try {
        // User ID passed from the frontend
        const userId = req.body.userId;

        // Profile data passed from the frontend
        const profileData = req.body;

        // Check if the user exists
        const user = await User.findByPk(userId);

        //when user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if a file is uploaded
        if (req.file) {
            const localFilePath = req.file.path;

            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (uploadResult && uploadResult.secure_url) {
                profileData.profilePictureUrl = uploadResult.url;
            } else {
                return res.status(500).json({ message: 'Error uploading file to Cloudinary' });
            }
        }

        // Check if the profile already exists
        let profile = await user.getProfile();

        if (profile) {
            // Update existing profile
            await profile.update(profileData);
        } else {
            // Create a new profile
            profile = await Profile.create({
                userId: userId,
                ...profileData
            });
        }

        return res.status(200).json({ message: 'Profile uploaded successfully', profile });
    } catch (error) {
        console.log('Error uploading profile:', error);
        return res.status(500).json({ message: 'An error occurred while uploading the profile' });
    }
}

module.exports = { updateProfileController };
