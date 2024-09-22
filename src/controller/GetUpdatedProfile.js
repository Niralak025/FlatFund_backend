const getUserProfileModel = require('../models/GetUserProfileModel');

// Create the getUserProfile controller
const getUserProfile = async (req, res) => {
    try {
        // Get the user ID from the request parameters
        const userId = req.body.userId;

        const userProfile = await getUserProfileModel.GetUserProfile(userId)

        if (userProfile.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'User profile not found'
            })
        }

        return res.status(200).json({
            header: {
                status: 200,
                message: "success"
            },
            status: 200,
            message: "success",
            data: userProfile
        })
    } catch (error) {
        // Handle any errors
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the controller function
module.exports = { getUserProfile };
