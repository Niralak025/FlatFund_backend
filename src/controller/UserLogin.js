const bcrypt = require('bcryptjs');
const { connection } = require('../db/db');

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const findUserQuery = 'SELECT * FROM user_data WHERE email = ?';
        connection.execute(findUserQuery, [email], async (error, results) => {

            if (error) {
                return res.status(500).json({ msg: 'Database query error' });
            }

            // If no user is found
            if (results.length === 0) {
                return res.status(400).json({ msg: 'User does not exist' });
            }

            // Get the user record (assuming there's only one result)
            const user = results[0];

            // Compare the password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Incorrect password' });
            }

            return res.status(200).json({ msg: 'Login successful', user: user })
        });
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = { userLogin };
