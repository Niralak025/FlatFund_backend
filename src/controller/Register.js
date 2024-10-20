const bcrypt = require('bcryptjs');
const db = require('../db/db');
const userTable = require('../models/User');
const { uploadOnCloudinary } = require("../utils/cloudinary");

const userRegister = async (req, res) => {
    userTable
    // console.log("req.body===req", req.body);
    const { first_name, last_name, email, password } = req.body;
    // console.log("{ first_name, last_name, email, password }====", { first_name, last_name, email, password },req.file);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let profilePictureUrl = '';
        // Check if a file is uploaded
        if (req.file) {
            const localFilePath = req.file.path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (uploadResult && uploadResult.secure_url) {
                profilePictureUrl = uploadResult.url;
            } else {
                return res.status(500).json({ message: 'Error uploading file to Cloudinary' });
            }
        }

        // console.log("{ first_name, last_name, email, password, profilePictureUrl }====", { first_name, last_name, email, password, profilePictureUrl });
        // Check if the email already exists in the database
        const queryCheckEmail = 'SELECT * FROM user_data WHERE email = ?';
        db.connection.execute(queryCheckEmail, [email],
            (error, results) => {
                if (error) {
                    console.error('Error checking existing user:', error);
                    return res.status(500).json({ message: 'Internal server error' });
                }
                if (results.length > 0) {
                    return res.status(400).json({ message: 'Email already exists' });
                }

                // Insert the new user into the database
                const queryInsertUser = `INSERT INTO user_data (first_name, last_name, email, password, profile_picture) VALUES (?, ?, ?, ?, ?)`;
                db.connection.execute(
                    queryInsertUser,
                    [first_name, last_name, email, hashedPassword, profilePictureUrl],
                    (error, results) => {

                        if (error) {
                            console.error('Error inserting new user:', error);
                            return res.status(500).json({ message: 'User registration failed' });
                        }

                        // Respond with a success message if the user is registered successfully
                        res.status(200).json({ message: 'User registered successfully!' });
                    }
                );
            });
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}


const updateUserById = async (req, res) => {
    const ID = req.params.id;
    const { first_name, last_name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let profilePictureUrl = '';
        // Check if a file is uploaded
        if (req.file) {
            const localFilePath = req.file.path;
            const uploadResult = await uploadOnCloudinary(localFilePath);
            if (uploadResult && uploadResult.secure_url) {
                profilePictureUrl = uploadResult.url;
            } else {
                return res.status(500).json({ message: 'Error uploading file to Cloudinary' });
            }
        }

        const updateQuery = `
        UPDATE user_data 
        SET first_name = ?, last_name = ?, email = ?, profile_picture = ? 
        WHERE id = ?
    `;

        db.connection.execute(updateQuery, [first_name, last_name, email, profilePictureUrl, ID], (error, results) => {
            if (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({ message: 'Failed to update user' });
            }

            res.status(200).json({ message: 'User updated successfully', results });
        });


    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }

}

const getUserById = async (req, res) => {
    const ID = req.params.id;
    try {
        const searchQuery = `SELECT * FROM user_data WHERE id = ?`;
        db.connection.execute(searchQuery, [ID], (error, results) => {
            if (error) {
                console.error('Error search user profile:', error);
                return res.status(500).json({ message: 'Failed to search user' });
            }
            res.status(200).json({ message: 'Successfully', results });
        });
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const deleteUserById = async (req, res) => {
    const ID = req.params.id;
    try {
        const deleteQuery = `DELETE FROM user_data WHERE id = ?`;
        db.connection.execute(deleteQuery, [ID], (error, results) => {
            if (error) {
                console.error('Error in delete user profile:', error);
                return res.status(500).json({ message: 'Failed to delete user' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const getAllRegisteredUsers = async (req, res) => {
    try {
        const getAllUserQuery = 'SELECT * FROM user_data';
        db.connection.execute(getAllUserQuery, (error, results) => {
            if (error) {
                return res.status(500).json({ msg: 'Database query error' })
            }
            res.status(200).json({ msg: 'success', data: results })
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = { userRegister, updateUserById, getUserById, deleteUserById, getAllRegisteredUsers };
