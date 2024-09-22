// models/profile.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Adjust the path as necessary
const User = require('./User');

class Profile extends Model { }

Profile.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user_data',
            key: 'id'
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    profilePictureUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profile_data',
    timestamps: true
});

// Define the relationship
User.hasOne(Profile, {
    foreignKey: 'userId',
    as: 'profile'
});

Profile.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// This ensures the table is created in the database if it doesn't exist
sequelize.sync()
    .then(() => console.log('user_profile_data table created successfully'))
    .catch(err => console.error('Error creating table:', err));

module.exports = Profile;
