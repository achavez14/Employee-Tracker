const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('sample_db', 'postgres', 'rootroot', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define a test model for demonstration
const TestModel = sequelize.define('TestModel', {
  name: {
    type: Sequelize.STRING
  }
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync the models with the database (create tables)
    await sequelize.sync({ force: true });
    console.log('Models synced with the database.');

    // Create a test record
    await TestModel.create({ name: 'Test Record' });
    console.log('Test record created successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Export the database connection and any related functions
module.exports = {
  sequelize,
  testConnection
};