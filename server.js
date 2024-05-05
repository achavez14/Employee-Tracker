const express = require('express');
const { sequelize } = require('./db'); // Import your Sequelize instance

const app = express();

// Sync Sequelize models to the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');

    // Define routes or other setup for your Express app here

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });