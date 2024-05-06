// Require the db.js file to establish the database connection
const { sequelize, testConnection, Employee } = require('./db');

// Call the testConnection function to test the database connection
testConnection()
  .then(() => {
    // Database connection successful
    console.log('Database connection test successful.');

    // Perform database operations here
    // Example: Query all employees
    Employee.findAll().then((employees) => {
      console.log('All employees:', employees);
    }).catch((error) => {
      console.error('Error querying employees:', error);
    });

  })
  .catch((error) => {
    // Database connection error
    console.error('Error testing database connection:', error);
  });
