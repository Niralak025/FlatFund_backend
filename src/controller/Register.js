const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userRegister = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUserByUsername = await User.findOne({ where: { username } });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'Username already exist' });
        }

        const user = await User.create({ username, password: hashedPassword, email });
        res.status(200).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'User registration failed' });
    }
}

module.exports = { userRegister };
