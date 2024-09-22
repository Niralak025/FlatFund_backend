const database = require('../../config/database');

const GetUserDataModel = async () => {
    const query = `SELECT * FROM nodedemodatabase.userdata`;
    try {
        // Destructure to get only the rows
        const [rows] = await database.query(query);
        return rows; // Return only the rows
    } catch (error) {
        console.error("Database query failed: ", error);
        throw error;
    }
}

module.exports = { GetUserDataModel };
