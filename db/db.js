const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize('sample_db', 'postgres', 'rootroot', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define a test model for demonstration
const Employee = sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobTitle: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2)
    }
  });  

// Test the database connection
async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
  
      // Sync the models with the database (without forcing)
      await sequelize.sync();
      console.log('Models synced with the database.');
  
      // Create a test record for Employee
      await Employee.create({
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Software Engineer',
        department: 'Engineering',
        salary: 80000.00
      });
      console.log('Test employee record created successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

// Export the database connection and any related functions
module.exports = {
  sequelize,
  testConnection
};