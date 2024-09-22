const database = require('../db/db');

const GetUserProfile = async (userId) => {
    const query = `SELECT * FROM nodedemodatabase.user_profile_data WHERE userId = ?`;
    try {
        // Destructure to get only the rows
        const [rows] = await database.query(query, [userId]);
        return rows; // Return only the rows
    } catch (error) {
        console.log("Database query failed: ", error);
        throw error;
    }
}

module.exports = { GetUserProfile };
