const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Assuming you have set up the Sequelize instance in dbConfig.js
const User = require('./user'); // Assuming you have a User model defined in user.js

const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    note_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false, // Disable Sequelize's default timestamps (createdAt and updatedAt)
    underscored: true, // Use snake_case for column names (e.g., created_at instead of createdAt)
    tableName: 'notes', // Set the actual table name if it's different from the model name in plural form
  }
);

module.exports = Note;
