const usersModel = require('../models/UsersModel');

const usersController = async (req, res) => {
    try {
        const getUsersData = await usersModel.GetUserDataModel();
        return res.status(200).json({
            header: {
                status: 200,
                message: "success"
            },
            status: 200,
            message: "success",
            user_data: getUsersData
        });

    } catch (error) {
        return res.status(500).json({
            header: {
                status: 500,
                message: error.message
            }
        });
    }
}

module.exports = { usersController };
