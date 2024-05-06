const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Define the Department model
const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'departments',
});

// Define the Employee model
const Employee = sequelize.define('Employee', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
  },
}, {
  tableName: 'employees',
});

// Associations
Employee.belongsTo(Department);

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync the models with the database (without forcing)
    await sequelize.sync();
    console.log('Models synced with the database.');

    const existingEmployee = await Employee.findOne({ where: { firstName: 'John', lastName: 'Doe' } });
    if (!existingEmployee) {
      // Create the test employee record
      const validDepartmentId = 1; // Assuming 1 is a valid DepartmentId
      await Employee.create({
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Software Engineer',
        department: 'Engineering', // You can remove this line if not needed
        salary: 80000.00,
        DepartmentId: validDepartmentId, // Ensure this matches an existing id in the departments table
      });
      console.log('Test employee record created successfully.');
    } else {
      console.log('Test employee record already exists.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, Department, Employee, testConnection };